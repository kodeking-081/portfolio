import { Link } from "react-router";
import { ChapterLabel } from "~/components/motion/ChapterLabel";
import { counts, evidenceIndex } from "~/content";
import { site } from "~/content/site";
import { cx } from "~/lib/cx";
import type { Route } from "./+types/evidence";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Evidence — ${site.name}` },
    {
      name: "description",
      content: "Every repo, and the milestones it backs up.",
    },
  ];
}

export default function Evidence() {
  const index = evidenceIndex();
  const c = counts();

  return (
    <main id="main" className="shell pt-20 pb-24 sm:pt-28">
      <ChapterLabel label="Evidence" />
      <h1 className="display-lg mt-8 max-w-4xl">
        The projects and code behind the claims.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
        {c.reposLinked} of {c.repos} tracked projects and codebases are linked to
        a milestone.
      </p>

      <ul className="mt-16 divide-y divide-line border-y border-line">
        {index.map(({ repo, proves }) => (
          <li
            key={repo.id}
            className="grid gap-4 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-10"
          >
            <div>
              <p className="font-mono text-base break-all">{repo.name}</p>
              <p className="label mt-3 flex gap-4 text-ink-muted">
                {repo.url ? (
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ink"
                  >
                    Code ↗
                  </a>
                ) : (
                  <span>{repo.statusLabel ?? "Institutional / Ongoing"}</span>
                )}
                {repo.demo && (
                  <a
                    href={repo.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ink"
                  >
                    Demo ↗
                  </a>
                )}
              </p>
            </div>

            {proves.length > 0 ? (
              <ul className="flex flex-wrap content-start gap-2">
                {proves.map((m) => (
                  <li key={m.slug}>
                    <Link
                      to={`/m/${m.slug}`}
                      viewTransition
                      className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm hover:border-ink-muted"
                    >
                      <span
                        aria-hidden="true"
                        className={cx(
                          "status-dot",
                          `status-dot--${m.status}`,
                          m.status === "done" && "text-accent-ink",
                          m.status === "now" && "text-now",
                          m.status === "next" && "text-ink-muted",
                        )}
                      />
                      {m.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="label self-start text-ink-muted">
                <span className="rounded-full border border-dashed border-line px-3 py-1.5">
                  Reference
                </span>
              </p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

