"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { useCloudTransition } from "./use-cloud-transition";
import styles from "./cloud-transition.module.css";

type CloudTransitionProps = {
  hero: ReactNode;
  children?: ReactNode;
};

export function CloudTransition({ hero, children }: CloudTransitionProps) {
  const sceneRef = useRef<HTMLElement>(null);

  useCloudTransition(sceneRef);

  return (
    <>
      <section ref={sceneRef} className={styles.scene} data-cloud-scene>
        <div className={styles.stage} data-cloud-stage>
          <div className={styles.hero}>{hero}</div>

          <div className={styles.clouds} aria-hidden="true">
            <Image
              className={styles.frontCloud}
              src="/media/cloud-transition/cloud-1-cropped.png"
              alt=""
              fill
              sizes="100vw"
            />
            <Image
              className={styles.rearCloud}
              src="/media/cloud-transition/cloud-2-full.png"
              alt=""
              fill
              sizes="100vw"
            />
          </div>

          <div className={styles.mist} aria-hidden="true">
            <Image
              className={styles.mistImage}
              src="/media/cloud-transition/cloud-gradient.png"
              alt=""
              fill
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <section className={styles.contentSection} data-cloud-transition-content>
        {children ? <div className={styles.content}>{children}</div> : null}
      </section>
    </>
  );
}
