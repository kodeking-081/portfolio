/**
 * Server-only (the `.server` suffix keeps it out of the browser bundle).
 *
 * Unauthenticated GitHub API calls are limited to 60/hour per IP, so the
 * result is cached in memory. Any failure — timeout, rate limit, offline —
 * returns null and the caller falls back to a count from content.
 */
const TTL_MS = 10 * 60 * 1000;
let cache: { at: number; count: number } | undefined;

export async function getPublicRepoCount(user: string): Promise<number | null> {
  // Lets you exercise the fallback path locally: GITHUB_OFFLINE=1 npm run dev
  if (process.env.GITHUB_OFFLINE) return null;
  if (cache && Date.now() - cache.at < TTL_MS) return cache.count;

  try {
    const res = await fetch(`https://api.github.com/users/${user}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": `${user}-portfolio`,
      },
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return null;

    const body: unknown = await res.json();
    const count =
      typeof body === "object" && body !== null && "public_repos" in body
        ? body.public_repos
        : undefined;
    if (typeof count !== "number") return null;

    cache = { at: Date.now(), count };
    return count;
  } catch {
    return null;
  }
}
