import { motion } from "motion/react";

/** "01 ——— CHAPTER". The rule draws in once, on first view. */
export function ChapterLabel({ index, label }: { index?: string; label: string }) {
  return (
    <p className="label flex items-center gap-3 text-accent-ink">
      {index && <span>{index}</span>}
      <motion.span
        aria-hidden="true"
        className="h-px w-10 origin-left bg-current"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.1, 1] }}
      />
      <span>{label}</span>
    </p>
  );
}
