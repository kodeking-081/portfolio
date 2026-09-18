import type { Status } from "~/content";
import { cx } from "~/lib/cx";

const copy: Record<Status, string> = {
  done: "Done",
  now: "In progress",
  next: "Next",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cx(
        "label inline-flex items-center gap-2",
        status === "done" && "text-accent-ink",
        status === "now" && "text-now",
        status === "next" && "text-ink-muted",
      )}
    >
      <span className={cx("status-dot", `status-dot--${status}`)} aria-hidden="true" />
      {copy[status]}
    </span>
  );
}
