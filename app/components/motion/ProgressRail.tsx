import { useInView } from "motion/react";
import { useRef } from "react";

/** Done / total as a bar that fills on first view. Same progressive
 *  enhancement as DigitRoll: the server renders the true fill. */
export function ProgressRail({ done, total }: { done: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  const fraction = total === 0 ? 0 : done / total;

  return (
    <div className="mt-6 max-w-xs">
      <p className="label text-ink-muted">
        {done} of {total} done
      </p>
      <div
        ref={ref}
        aria-hidden="true"
        className="progress-rail mt-3 h-1 overflow-hidden rounded-full bg-line"
        data-rolled={inView || undefined}
      >
        <div
          className="progress-fill h-full rounded-full bg-accent"
          style={{ "--p": fraction } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
