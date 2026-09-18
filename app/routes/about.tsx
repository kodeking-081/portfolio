import { DevNote } from "~/components/DevNote";
import { StatusBadge } from "~/components/StatusBadge";
import { ChapterLabel } from "~/components/motion/ChapterLabel";
import type { Status } from "~/content";
import { site } from "~/content/site";
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `About — ${site.name}` },
    { name: "description", content: `About ${site.name}. ${site.intro}` },
  ];
}

const legend: { status: Status; meaning: string }[] = [
  { status: "done", meaning: "Built, and at least one linked repo shows it." },
  { status: "now", meaning: "Being built right now." },
  { status: "next", meaning: "Not started. On the list." },
];

export default function About() {
  return (
    <main id="main" className="shell pt-20 pb-24 sm:pt-28">
      <ChapterLabel label="About" />
      <h1 className="display-lg mt-8">{site.name}</h1>

      <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed">
        {site.about.length > 0 ? (
          site.about.map((paragraph, i) => <p key={i}>{paragraph}</p>)
        ) : (
          <DevNote>
            Your intro goes here. Add paragraphs to{" "}
            <code className="font-mono">about</code> in{" "}
            <code className="font-mono">app/content/site.ts</code>.
          </DevNote>
        )}
      </div>

      <section
        aria-labelledby="legend-heading"
        className="mt-20 border-t border-line pt-12"
      >
        <h2 id="legend-heading" className="label text-ink-muted">
          How to read this site
        </h2>
        <dl className="mt-8 grid max-w-2xl gap-6">
          {legend.map(({ status, meaning }) => (
            <div
              key={status}
              className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
            >
              <dt>
                <StatusBadge status={status} />
              </dt>
              <dd className="text-ink-muted">{meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="label mt-20">
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="text-ink-muted hover:text-ink"
        >
          github.com/{site.githubUser} ↗
        </a>
      </p>
    </main>
  );
}
