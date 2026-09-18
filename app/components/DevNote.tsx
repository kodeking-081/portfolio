/**
 * A dashed "write this" hint. Rendered only by the dev server —
 * `import.meta.env.DEV` is replaced with `false` in production builds, so
 * the whole branch is removed from the shipped bundle.
 */
export function DevNote({ children }: { children: React.ReactNode }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="rounded-lg border border-dashed border-line p-5 text-sm text-ink-muted">
      <span className="label mr-2 text-accent-ink">Dev only</span>
      {children}
    </div>
  );
}
