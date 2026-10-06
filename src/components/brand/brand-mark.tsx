import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  priority?: boolean;
};

export function BrandMark({ className, priority = false }: BrandMarkProps) {
  return (
    <Image
      className={className}
      src="/brand/voi-mark.svg"
      alt=""
      width={64}
      height={64}
      priority={priority}
    />
  );
}
