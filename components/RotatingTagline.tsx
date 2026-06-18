"use client";

import { useEffect, useState } from "react";

export function RotatingTagline({ lines }: { lines: string[] }) {
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) {
      // Defer to avoid synchronous setState within effect (React compiler rule)
      setTimeout(() => setReduce(true), 0);
      return;
    }
    const id = setInterval(() => setActive((i) => (i + 1) % lines.length), 3200);
    return () => clearInterval(id);
  }, [lines.length]);

  return (
    <h1
      className={`tagline-stack${reduce ? " tagline-static" : ""}`}
      aria-label={lines.join(" ")}
      style={reduce ? { gridAutoFlow: "row" } : undefined}
    >
      {lines.map((line, i) => (
        <span key={i} className={`line${reduce || i === active ? " is-active" : ""}`}>
          {line}
        </span>
      ))}
    </h1>
  );
}
