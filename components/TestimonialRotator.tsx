"use client";

import { useEffect, useRef, useState } from "react";

export type Testimonial = { quote: string; cite: string; big?: boolean };

export function TestimonialRotator({ items }: { items: Testimonial[] }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function restart() {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIdx((i) => (i + 1) % items.length), 11000);
  }

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // `restart` only reads `items.length`; `items` is a static prop on this content
    // site, so re-keying the interval on length alone is sufficient and avoids
    // recreating it every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return (
    <div className="pullquote rotator reveal">
      <span className="quote-mark" aria-hidden="true">
        &ldquo;
      </span>
      {items.map((t, i) => (
        <figure key={i} className={`slide${i === idx ? " is-active" : ""}`} style={{ margin: 0 }}>
          <blockquote style={t.big ? { fontSize: 42 } : undefined}>{t.quote}</blockquote>
          <cite>{t.cite}</cite>
        </figure>
      ))}
      <div className="rotator-dots" role="tablist" aria-label="Testimonials">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show testimonial ${i + 1}`}
            className={i === idx ? "is-active" : undefined}
            onClick={() => {
              setIdx(i);
              restart();
            }}
          />
        ))}
      </div>
    </div>
  );
}
