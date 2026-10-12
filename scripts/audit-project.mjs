import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

// Read-only inventory. Candidates require review before archiving: CMS content
// and computed asset paths can reference files beyond the static import graph.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const relative = (file) => path.relative(root, file).replaceAll("\\", "/");
function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}
const sources = filesIn(path.join(root, "src"));
const tests = filesIn(path.join(root, "tests"));
const config = ts.readConfigFile(
  path.join(root, "tsconfig.json"),
  ts.sys.readFile,
);
const options = ts.parseJsonConfigFileContent(
  config.config,
  ts.sys,
  root,
).options;
const convention =
  /(?:^|\/)(?:page|layout|template|loading|error|global-error|not-found|default|route|robots|sitemap|manifest|opengraph-image|twitter-image|icon|apple-icon)\.[cm]?[jt]sx?$/;
const roots = sources.filter(
  (file) =>
    convention.test(relative(file)) ||
    relative(file) === "src/proxy.ts" ||
    /^src\/app\/(?:icon|apple-icon)\.(?:svg|png|jpg|ico)$/.test(relative(file)),
);
const reachable = new Set();
const packages = new Set();
const assetPaths = new Set();
const assetPrefixes = new Set();
function recordAsset(value) {
  if (!/^\/(media|brand)\//.test(value)) return;
  assetPaths.add(value);
  const target = path.join(root, "public", value);
  if (
    value !== "/media/" &&
    value !== "/brand/" &&
    fs.existsSync(target) &&
    fs.statSync(target).isDirectory()
  )
    assetPrefixes.add(value.endsWith("/") ? value : `${value}/`);
}
function visit(file) {
  if (reachable.has(file)) return;
  reachable.add(file);
  if (file.endsWith(".json")) {
    const walkJson = (value) => {
      if (typeof value === "string") recordAsset(value);
      else if (value && typeof value === "object") {
        for (const [key, entry] of Object.entries(value)) {
          recordAsset(key);
          walkJson(entry);
        }
      }
    };
    walkJson(JSON.parse(fs.readFileSync(file, "utf8")));
    return;
  }
  if (file.endsWith(".css")) {
    const css = fs.readFileSync(file, "utf8");
    for (const match of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g))
      recordAsset(match[1]);
    for (const match of css.matchAll(/@import\s+["']([^"']+)["']/g)) {
      if (match[1].startsWith("."))
        visit(path.resolve(path.dirname(file), match[1]));
    }
    return;
  }
  if (!/\.[cm]?[jt]sx?$/.test(file)) return;
  const source = ts.createSourceFile(
    file,
    fs.readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  function walk(node) {
    if (ts.isStringLiteralLike(node)) {
      recordAsset(node.text);
      // Static new URL(..., import.meta.url), next/font sources and imports.
      if (node.text.startsWith("./") || node.text.startsWith("../")) {
        const target = path.resolve(path.dirname(file), node.text);
        if (fs.existsSync(target) && fs.statSync(target).isFile())
          visit(target);
      }
    }
    if (
      ts.isTemplateExpression(node) &&
      /^\/(media|brand)\//.test(node.head.text)
    )
      assetPrefixes.add(node.head.text);
    const specifier =
      ts.isImportDeclaration(node) || ts.isExportDeclaration(node)
        ? node.moduleSpecifier
        : ts.isCallExpression(node) &&
            node.expression.kind === ts.SyntaxKind.ImportKeyword
          ? node.arguments[0]
          : undefined;
    if (specifier && ts.isStringLiteral(specifier)) {
      const name = specifier.text;
      if (name.startsWith(".") || name.startsWith("@/")) {
        const base = name.startsWith("@/")
          ? path.join(root, "src", name.slice(2))
          : path.resolve(path.dirname(file), name);
        const resolved =
          fs.existsSync(base) && fs.statSync(base).isFile()
            ? base
            : ts.resolveModuleName(name, file, options, ts.sys).resolvedModule
                ?.resolvedFileName;
        if (resolved && !resolved.includes("node_modules"))
          visit(path.resolve(resolved));
      } else if (!name.startsWith("node:")) {
        packages.add(
          name.startsWith("@")
            ? name.split("/").slice(0, 2).join("/")
            : name.split("/")[0],
        );
      }
    }
    ts.forEachChild(node, walk);
  }
  walk(source);
}
[...roots, ...tests].forEach(visit);
const assets = filesIn(path.join(root, "public"));
const unusedAssets = assets.filter((file) => {
  const url =
    "/" + path.relative(path.join(root, "public"), file).replaceAll("\\", "/");
  return (
    !assetPaths.has(url) &&
    ![...assetPrefixes].some((prefix) => url.startsWith(prefix))
  );
});
console.log(
  JSON.stringify(
    {
      entrypoints: roots.map(relative),
      unreachableSourceCandidates: sources
        .filter(
          (file) =>
            !reachable.has(file) &&
            !file.endsWith(".d.ts") &&
            !file.endsWith("favicon.ico"),
        )
        .map(relative),
      unusedPublicCandidates: unusedAssets.map(relative),
      importedPackages: [...packages].sort(),
    },
    null,
    2,
  ),
);
