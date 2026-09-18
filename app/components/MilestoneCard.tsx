import { motion } from "motion/react";
import { Link, useViewTransitionState } from "react-router";
import type { Milestone } from "~/content";
import { cx } from "~/lib/cx";
import { StatusBadge } from "./StatusBadge";

export function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const href = `/m/${milestone.slug}`;
  // Only the card being opened carries the shared name, because a
  // view-transition-name must be unique on the page.
  const opening = useViewTransitionState(href);
  const proofs = milestone.evidence.length;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
    >
      <Link
        to={href}
        viewTransition
        className={cx(
          "group block rounded-lg border p-5 transition-colors sm:p-6",
          milestone.status === "done" && "border-line bg-surface hover:border-accent-ink",
          milestone.status === "now" && "border-now/50 bg-surface hover:border-now",
          milestone.status === "next" && "border-dashed border-line hover:border-ink-muted",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <StatusBadge status={milestone.status} />
          <span
            aria-hidden="true"
            className="text-ink-muted transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </div>
        <h3
          className={cx(
            "mt-4 font-display text-xl leading-tight font-bold sm:text-2xl",
            milestone.status === "next" && "text-ink-muted",
          )}
          style={{ viewTransitionName: opening ? "milestone-title" : "none" }}
        >
          {milestone.title}
        </h3>
        <p className="label mt-4 text-ink-muted">
          {proofs === 0 ? "No evidence yet" : `${proofs} repo${proofs > 1 ? "s" : ""} as evidence`}
        </p>
      </Link>
    </motion.div>
  );
}
