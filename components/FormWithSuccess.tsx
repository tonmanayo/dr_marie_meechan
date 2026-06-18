"use client";

import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";

export function FormWithSuccess({
  formClassName,
  children,
  success,
  successStyle,
}: {
  formClassName?: string;
  children: ReactNode;
  success: ReactNode;
  successStyle?: CSSProperties;
}) {
  const [done, setDone] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
    requestAnimationFrame(() => successRef.current?.focus());
  }

  return (
    <div style={{ position: "relative" }}>
      <form
        className={formClassName}
        onSubmit={onSubmit}
        style={done ? { display: "none" } : undefined}
      >
        {children}
      </form>
      <div
        className="form-success"
        ref={successRef}
        hidden={!done}
        tabIndex={-1}
        style={successStyle}
      >
        {success}
      </div>
    </div>
  );
}
