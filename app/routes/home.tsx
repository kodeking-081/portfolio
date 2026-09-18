import { data, Link } from "react-router";
import { DevNote } from "~/components/DevNote";
import { MilestoneCard } from "~/components/MilestoneCard";
import { ChapterLabel } from "~/components/motion/ChapterLabel";
import { DigitRoll } from "~/components/motion/DigitRoll";
import { ProgressRail } from "~/components/motion/ProgressRail";
import { RevealText } from "~/components/motion/RevealText";
import { chapterNumber, counts, milestonesIn, repos, tracks } from "~/content";
import { site } from "~/content/site";
import { getPublicRepoCount } from "~/lib/github.server";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${site.name} — technical milestones` },
    { name: "description", content: site.intro },
  ];
}

// The loader only carries what changes per request. Content is imported
// directly — it's fixed at build time, so there's nothing to load.
export async function loader() {
  const live = await getPublicRepoCount(site.githubUser);
  const publicRepos = live ?? repos.filter((r) => r.url).length;

  return data(
    { publicRepos, live: live !== null },
    {
      // Browsers reuse the page for 5 minutes; a CDN for an hour.
      headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" },
    },
  );
}

export function headers({ loaderHeaders }: Route.HeadersArgs) {
  return loaderHeaders;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const c = counts();
  // In production, tracks with no milestones yet are hidden; in dev they
  // show so you can see where to add things.
  const visible = import.meta.env.DEV
    ? tracks
    : tracks.filter((t) => milestonesIn(t.id).length > 0);

  return (
    <main id="main">
      <section className="shell pt-20 pb-16 sm:pt-28 sm:pb-24">
        <ChapterLabel index="00" label="Index" />
        <h1 className="display-xl mt-8 max-w-5xl">
          <RevealText text={site.headline} />
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
          {site.intro}
        </p>
      </section>

      <section aria-label="Counts" className="shell">
        {/* 1px gaps over a line-coloured background draw the dividers, so
            they're right at 2 columns and at 4 without per-cell borders. */}
        <dl className="grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-4">
          <Stat label="Done" value={c.done} />
          <Stat label="In progress" value={c.now} />
          <Stat label="Next" value={c.next} />
          <Stat
            label="Public repos"
            value={loaderData.publicRepos}
            note={
              loaderData.live
                ? "live from GitHub"
                : "GitHub unreachable — local count"
            }
          />
        </dl>
      </section>

      <div id="tracks" className="mt-8">
        {visible.map((track) => (
          <TrackChapter key={track.id} track={track} />
        ))}
      </div>

      <section className="shell">
        <Link
          to="/evidence"
          viewTransition
          className="group block border-t border-line py-20"
        >
          <ChapterLabel label="The evidence" />
          <p className="display-md mt-6 max-w-3xl transition-colors group-hover:text-accent-ink">
            {c.reposLinked} of {c.repos} repos linked to a milestone.{" "}
            <span aria-hidden="true">→</span>
          </p>
        </Link>
      </section>
    </main>
  );
}

function Stat({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note?: string;
}) {
  return (
    <div className="bg-ground py-8 pr-4 even:pl-5 sm:pl-6 sm:first:pl-0">
      <dt className="label text-ink-muted">{label}</dt>
      <dd className="display-lg mt-3">
        <DigitRoll value={value} />
      </dd>
      {note && <dd className="mt-2 text-xs text-ink-muted">{note}</dd>}
    </div>
  );
}

function TrackChapter({ track }: { track: (typeof tracks)[number] }) {
  const items = milestonesIn(track.id);
  const done = items.filter((m) => m.status === "done").length;
  const headingId = `track-${track.id}`;

  return (
    // Border on the inner grid, not the padded shell, so the rule lines up
    // with the content edge like the stats grid above.
    <section aria-labelledby={headingId} className="shell">
      <div className="grid gap-10 border-t border-line py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16 md:py-24">
        <div className="md:sticky md:top-28 md:self-start">
          <ChapterLabel index={chapterNumber(track.id)} label="Chapter" />
          <h2 id={headingId} className="display-md mt-5 scroll-mt-40">
            {track.name}
          </h2>
          {track.blurb && (
            <p className="mt-4 max-w-sm text-ink-muted">{track.blurb}</p>
          )}
          {items.length > 0 && (
            <ProgressRail done={done} total={items.length} />
          )}
        </div>

        {items.length > 0 ? (
          <ol className="space-y-4">
            {items.map((m) => (
              <li key={m.slug}>
                <MilestoneCard milestone={m} />
              </li>
            ))}
          </ol>
        ) : (
          <DevNote>
            No milestones in this track yet. Add one in{" "}
            <code className="font-mono">app/content/milestones.ts</code> with{" "}
            <code className="font-mono">track: "{track.id}"</code>. This track
            is hidden in production until it has one.
          </DevNote>
        )}
      </div>
    </section>
  );
}
