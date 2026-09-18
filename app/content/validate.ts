import { milestones } from "./milestones";
import { repos } from "./repos";
import { tracks } from "./tracks";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function duplicates(values: readonly string[]) {
  return values.filter((v, i) => values.indexOf(v) !== i);
}

/**
 * Rules the type system can't express. Dangling track/repo ids are already
 * compile errors; this catches the rest. Runs from react-router.config.ts,
 * so a bad edit fails `npm run dev` and `npm run build` immediately.
 */
export function validateContent() {
  const problems: string[] = [];

  for (const id of duplicates(tracks.map((t) => t.id)))
    problems.push(`duplicate track id "${id}"`);
  for (const id of duplicates(repos.map((r) => r.id)))
    problems.push(`duplicate repo id "${id}"`);
  for (const slug of duplicates(milestones.map((m) => m.slug)))
    problems.push(`duplicate milestone slug "${slug}"`);

  for (const m of milestones) {
    if (!SLUG.test(m.slug))
      problems.push(`milestone slug "${m.slug}" must be lowercase-with-hyphens`);
    if (!m.title.trim()) problems.push(`milestone "${m.slug}" has no title`);
    if (m.status === "done" && m.evidence.length === 0)
      problems.push(`milestone "${m.slug}" is done but links no evidence`);
  }

  if (problems.length > 0) {
    throw new Error(
      `Content problems in app/content:\n  - ${problems.join("\n  - ")}`,
    );
  }
}
