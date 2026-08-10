"use client";

import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";

export function FormWithSuccess({
  formClassName,
  children,
  success,
  successStyle,
  action,
}: {
  formClassName?: string;
  children: ReactNode;
  success: ReactNode;
  successStyle?: CSSProperties;
  action?: string;
}) {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);

  function showSuccess() {
    setDone(true);
    requestAnimationFrame(() => successRef.current?.focus());
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    if (!action) {
      showSuccess();
      return;
    }
    const data = new FormData(e.currentTarget);
    setError(false);
    setSubmitting(true);
    try {
      const res = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          name: String(data.get("name") ?? ""),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      showSuccess();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <form
        className={formClassName}
        onSubmit={onSubmit}
        aria-busy={submitting}
        style={done ? { display: "none" } : undefined}
      >
        {children}
        {error && (
          <p
            role="alert"
            className="small"
            style={{ color: "var(--color-rose)", marginTop: "8px" }}
          >
            Sorry — something went wrong. Please try again in a moment.
          </p>
        )}
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
