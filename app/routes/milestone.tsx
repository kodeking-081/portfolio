import { data, isRouteErrorResponse, Link } from "react-router";
import { DevNote } from "~/components/DevNote";
import { StatusBadge } from "~/components/StatusBadge";
import { ChapterLabel } from "~/components/motion/ChapterLabel";
import {
  chapterNumber,
  evidenceFor,
  getMilestone,
  getTrack,
  neighbours,
  type Milestone,
} from "~/content";
import { site } from "~/content/site";
import { cx } from "~/lib/cx";
import type { Route } from "./+types/milestone";

export function loader({ params }: Route.LoaderArgs) {
  const milestone = getMilestone(params.slug);
  // Thrown, not returned: the response gets a real 404 status and this
  // route's ErrorBoundary renders instead of the component.
  if (!milestone) throw data("Milestone not found", { status: 404 });

  const track = getTrack(milestone.track);
  return {
    milestone,
    track,
    chapter: chapterNumber(track.id),
    evidence: evidenceFor(milestone),
    ...neighbours(milestone),
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: `Not found — ${site.name}` }];
  const { milestone, track } = loaderData;
  return [
    { title: `${milestone.title} — ${site.name}` },
    {
      name: "description",
      content: milestone.what?.split("\n")[0] ?? `${track.name} milestone.`,
    },
  ];
}

export default function MilestonePage({ loaderData }: Route.ComponentProps) {
  const { milestone, track, chapter, evidence, prev, next } = loaderData;

  return (
    <main id="main" className="shell pt-12 pb-24 sm:pt-16">
      <Link
        to={{ pathname: "/", hash: `track-${track.id}` }}
        viewTransition
        className="label text-ink-muted hover:text-ink"
      >
        ← {track.name}
      </Link>

      <header className="mt-14">
        <ChapterLabel index={chapter} label={track.name} />
        <h1
          className="display-lg mt-6 max-w-4xl"
          style={{ viewTransitionName: "milestone-title" }}
        >
          {milestone.title}
        </h1>
        <div className="mt-6">
          <StatusBadge status={milestone.status} />
        </div>
      </header>

      <div className="mt-16 grid gap-14 border-t border-line pt-14 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-20">
        <div className="space-y-14">
          <Writeup label="What I built" field="what" text={milestone.what} />
          <Writeup
            label="What clicked"
            field="learned"
            text={milestone.learned}
          />
          <Writeup
            label="What I'd change"
            field="wouldChange"
            text={milestone.wouldChange}
          />
        </div>

        <aside aria-labelledby="evidence-heading">
          <h2 id="evidence-heading" className="label text-ink-muted">
            Evidence
          </h2>
          {evidence.length === 0 ? (
            <p className="mt-4 text-ink-muted">No repos linked yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {evidence.map((repo) => (
                <li key={repo.id} className="py-4">
                  <p className="font-mono text-sm break-all">{repo.name}</p>
                  <p className="label mt-2 flex gap-4 text-ink-muted">
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
                      <span>Not public yet</span>
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
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>

      {(prev || next) && (
        <nav
          aria-label={`More in ${track.name}`}
          className="mt-24 grid gap-4 border-t border-line pt-10 sm:grid-cols-2"
        >
          {prev ? <Neighbour milestone={prev} direction="prev" /> : <span />}
          {next && <Neighbour milestone={next} direction="next" />}
        </nav>
      )}
    </main>
  );
}

function Writeup({
  label,
  field,
  text,
}: {
  label: string;
  field: keyof Milestone;
  text?: string;
}) {
  if (!text) {
    return (
      <DevNote>
        <strong className="font-medium text-ink">{label}</strong> — not written
        yet. Add <code className="font-mono">{field}</code> to this milestone in{" "}
        <code className="font-mono">app/content/milestones.ts</code>.
      </DevNote>
    );
  }

  return (
    <section>
      <h2 className="label text-ink-muted">{label}</h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed">
        {text.split(/\n\s*\n/).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function Neighbour({
  milestone,
  direction,
}: {
  milestone: Milestone;
  direction: "prev" | "next";
}) {
  return (
    <Link
      to={`/m/${milestone.slug}`}
      viewTransition
      className={cx(
        "group block rounded-lg border border-line p-5 hover:border-ink-muted",
        direction === "next" && "sm:text-right",
      )}
    >
      <span className="label text-ink-muted">
        {direction === "prev" ? "← Previous" : "Next →"}
      </span>
      <span className="mt-2 block font-display text-lg font-bold">
        {milestone.title}
      </span>
    </Link>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main id="main" className="shell py-24">
      <p className="label text-accent-ink">{notFound ? "404" : "Error"}</p>
      <h1 className="display-lg mt-4 max-w-3xl">
        {notFound
          ? "No milestone lives at this address."
          : "This milestone failed to load."}
      </h1>
      <Link
        to="/"
        viewTransition
        className="label mt-10 inline-block hover:underline"
      >
        ← All tracks
      </Link>
    </main>
  );
}
