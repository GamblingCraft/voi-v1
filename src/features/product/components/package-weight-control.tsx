"use client";

import { useEffect, useState } from "react";

export function PackageWeightControl() {
  const [weight, setWeight] = useState(2);
  useEffect(() => {
    const update = (event: Event) =>
      setWeight((event as CustomEvent<number>).detail);
    window.addEventListener("voi:weight", update);
    return () => window.removeEventListener("voi:weight", update);
  }, []);
  return (
    <div
      className="voi-weight"
      aria-label="Масса ПВД-упаковки"
      style={{ position: "relative", left: "14.5vw", zIndex: 100 }}
    >
      {[2, 3, 5].map((kg) => (
        <button
          key={kg}
          type="button"
          className={weight === kg ? "active" : ""}
          aria-pressed={weight === kg}
          onClick={() =>
            window.dispatchEvent(new CustomEvent("voi:weight", { detail: kg }))
          }
        >
          {kg} кг
        </button>
      ))}
    </div>
  );
}
