"use client";

import { useRef, useState, type ReactNode } from "react";

export type FaqEntry = { q: ReactNode; a: ReactNode };

export function Faq({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [openHeight, setOpenHeight] = useState<number | undefined>(undefined);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  function toggle(i: number) {
    if (open === i) {
      setOpen(null);
      setOpenHeight(undefined);
    } else {
      setOpen(i);
      setOpenHeight(panels.current[i]?.scrollHeight);
    }
  }

  return (
    <div className="faq reveal">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq__item${isOpen ? " is-open" : ""}`}>
            <button
              className="faq__q"
              type="button"
              aria-expanded={isOpen ? "true" : "false"}
              onClick={() => toggle(i)}
            >
              {item.q}
              <span className="faq__icon">
                <i className="ph-light ph-plus" aria-hidden="true" />
              </span>
            </button>
            <div
              className="faq__a"
              ref={(el) => {
                panels.current[i] = el;
              }}
              style={isOpen ? { maxHeight: openHeight } : undefined}
            >
              <div className="faq__a-inner">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
