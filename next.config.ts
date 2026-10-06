import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...(process.env.SITE_INDEXABLE === "true" &&
          process.env.NEXT_PUBLIC_SITE_URL &&
          !/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(
            process.env.NEXT_PUBLIC_SITE_URL,
          )
            ? []
            : [
                {
                  key: "X-Robots-Tag",
                  value:
                    "noindex, nofollow, noarchive, nosnippet, noimageindex",
                },
              ]),
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
