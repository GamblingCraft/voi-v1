"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { useCloudTransition } from "./use-cloud-transition";
import parallaxStyles from "./cloud-transition.module.css";
import cloudStyles from "./product-cloud-transition.module.css";

type CloudTransitionProps = {
  hero: ReactNode;
  mode?: "parallax" | "clouds";
  id?: string;
  children?: ReactNode;
};

export function CloudTransition({
  hero,
  children,
  mode = "parallax",
  id,
}: CloudTransitionProps) {
  const styles = mode === "clouds" ? cloudStyles : parallaxStyles;
  const sceneRef = useRef<HTMLElement>(null);

  useCloudTransition(sceneRef, mode);

  return (
    <>
      <section id={id} ref={sceneRef} className={styles.scene} data-cloud-scene>
        <div className={styles.stage} data-cloud-stage>
          <div className={styles.hero}>{hero}</div>
          {mode === "clouds" && (
            <>
              <div className={cloudStyles.clouds} aria-hidden="true">
                <Image
                  className={cloudStyles.frontCloud}
                  src="/media/cloud-transition/cloud-1-cropped.png"
                  alt=""
                  fill
                  sizes="100vw"
                />
                <Image
                  className={cloudStyles.rearCloud}
                  src="/media/cloud-transition/cloud-2-full.png"
                  alt=""
                  fill
                  sizes="100vw"
                />
              </div>
              <div className={cloudStyles.mist} aria-hidden="true">
                <Image
                  className={cloudStyles.mistImage}
                  src="/media/cloud-transition/cloud-gradient.png"
                  alt=""
                  fill
                  sizes="100vw"
                />
              </div>
            </>
          )}
        </div>
      </section>

      <section
        className={styles.contentSection}
        data-cloud-transition-content
        data-hero-following={mode === "parallax" || undefined}
      >
        {children ? <div className={styles.content}>{children}</div> : null}
      </section>
    </>
  );
}
