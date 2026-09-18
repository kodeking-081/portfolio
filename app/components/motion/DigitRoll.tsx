import { useInView } from "motion/react";
import { useRef } from "react";

const DIGITS = "0123456789".split("");

/**
 * Slot-machine counter. Each digit is a 0–9 column shifted to its value.
 *
 * The server renders the final number, so it's correct without JavaScript.
 * With JS, CSS holds the columns at 0 (see `.js .digit-roll` in app.css)
 * until the element scrolls into view, then transitions them to the value.
 * Motion is only used to detect "in view".
 */
export function DigitRoll({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <span ref={ref} className="digit-roll" data-rolled={inView || undefined}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex">
        {String(value)
          .split("")
          .map((digit, i) => (
            <span key={i} className="digit-mask">
              <span
                className="digit-col"
                style={{ "--d": digit, "--i": i } as React.CSSProperties}
              >
                {DIGITS.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </span>
            </span>
          ))}
      </span>
    </span>
  );
}
