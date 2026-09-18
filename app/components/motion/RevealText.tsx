/**
 * Word-by-word rise, done in CSS rather than Motion: it starts as soon as the
 * stylesheet loads, so the hero text never waits on JavaScript to appear.
 */
export function RevealText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <span className="reveal-mask">
              <span
                className="reveal-word"
                style={{ "--i": i } as React.CSSProperties}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </>
  );
}
