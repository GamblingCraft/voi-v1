import Link from "next/link";
import Image from "next/image";
import { iceFormats, type IceFormat } from "../../ice-formats";
import formatsStyles from "./catalog-formats.module.css";

export function CatalogFormats({ format }: { format: IceFormat }) {
  return (
    <nav id="discover" className={formatsStyles.formats} aria-label="Виды льда">
      {iceFormats.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          aria-current={format.id === item.id ? "page" : undefined}
        >
          <div
            className={formatsStyles.formatThumb}
            data-format={item.id}
            aria-hidden="true"
          >
            {item.id === "formed" && (
              <Image
                src="/media/products/sphere.png"
                alt=""
                fill
                sizes="160px"
              />
            )}
          </div>
          <div className={formatsStyles.formatLabel}>
            <strong>{item.name}</strong>
          </div>
        </Link>
      ))}
    </nav>
  );
}
