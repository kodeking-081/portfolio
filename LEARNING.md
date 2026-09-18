# Learning notes

Why this site is built the way it is. Each section is one decision: what we
did, what we could have done instead, and why we didn't.

---

## How to add a milestone

You'll do this after reading each repo.

1. Open `app/content/milestones.ts`.
2. Add an entry:

   ```ts
   {
     slug: "jwt-refresh-token-auth",       // URL: /m/jwt-refresh-token-auth
     track: "backend",                      // must be an id from tracks.ts
     title: "Built JWT auth with access + refresh tokens",
     status: "done",                        // "done" | "now" | "next"
     evidence: ["copilot-transcript-reviewer"], // ids from repos.ts
     what: "…",
     learned: "…",
     wouldChange: "…",
   },
   ```

3. Run `npm run dev` and open the milestone. If you got an id wrong, the
   type checker tells you which ids exist. If you marked something `done`
   without evidence, the dev server refuses to start and tells you why.
4. Commit it. The git history of this file is part of the record.

Blank lines inside `what` / `learned` / `wouldChange` start new paragraphs.
Rename or reorder tracks in `tracks.ts`; their order sets the chapter numbers.
Personal text (headline, intro, about) lives in `site.ts`.

Anything you haven't written shows a dashed **Dev only** hint while you run
`npm run dev`. Production builds hide those hints, and hide tracks that have
no milestones yet.

---

## 1. React Router v8, framework mode

**Did:** `create-react-router`, which scaffolds React Router in framework
mode: file-based route modules, loaders, server rendering, Vite.

**Instead:** Remix v2 (now merged into React Router), Remix v3 (a separate
rewrite, still preview), Next.js, Astro.

**Why:** Framework-mode React Router *is* the Remix model you wanted to
learn: loaders, actions, nested routes, `ErrorBoundary`s. It was v7 when we
planned this; the scaffold installed v8.4, same model. Note what the
framework does *not* give you: animation. Every animation here is CSS or
Motion, and would look the same on any framework.

React Router ships its own docs inside the package, so check the installed
version rather than blog posts: `node_modules/react-router/docs/`.

## 2. Tokens as CSS variables, not Tailwind colours

**Did:** Every colour is a CSS variable in `app/app.css`, mapped into
Tailwind with `@theme inline`. Dark mode redefines the variables under
`prefers-color-scheme: dark`.

**Instead:** Tailwind's `dark:` variant on every element (`bg-white
dark:bg-gray-950`), which the scaffold used.

**Why:** With `dark:` everywhere, a palette change means touching every
component. With tokens, components say `text-ink-muted` and never know which
theme is active. One file owns the palette.

Contrast was checked, not eyeballed. The first light-mode teal for "in
progress" measured 3.8:1 on cards, under the 4.5:1 minimum for small text.
It was darkened to pass.

## 3. Content as typed TypeScript, checked twice

**Did:** Tracks, repos and milestones are TypeScript arrays. Track and repo
ids are *literal types* (`as const`), so `track: "backend"` only compiles if
a track with that id exists. Rules types can't express (unique slugs, "done
needs evidence") live in `validateContent()`, which runs from
`react-router.config.ts`.

**Instead:** Markdown/MDX files with frontmatter, a headless CMS, or a
database.

**Why:** The content is small and you're the only author. Types turn most
mistakes into red squiggles in the editor. Running validation from the
config file means both `dev` and `build` stop immediately on bad content.
Nothing broken gets served or shipped. `build` also runs `typecheck` first,
because Vite alone strips types without checking them.

The core rule, *a milestone can't be done without a linked repo*, is
enforced by code, not by discipline.

## 4. Progressive enhancement for animations

**Did:** Three tiers.

- **Hero text** (`RevealText`) animates in pure CSS. It starts when the
  stylesheet loads, before React hydrates, so the biggest text on the page
  never waits on JavaScript.
- **Data-carrying animations** (`DigitRoll`, `ProgressRail`) render their
  *real* values in the server HTML. A one-line script in `<head>` adds a
  `js` class to `<html>` before first paint; CSS uses `.js` to hold them at
  zero until Motion's `useInView` says they're visible, then CSS transitions
  do the movement.
- **Decoration** (the chapter-label rule, card hover, scroll bar) uses
  Motion directly. If JS fails, you lose a flourish, not information.

**Instead:** Motion everywhere, with `initial={{ opacity: 0 }}`.

**Why:** With Motion's `initial`, the server HTML contains the start state.
If JavaScript is slow or fails, visitors see invisible headings and counters
stuck at 0. The rule: *the server HTML must always be true*.

Reduced motion is handled twice: `<MotionConfig reducedMotion="user">` for
Motion, and a `prefers-reduced-motion` media query for the CSS animations.

`<html suppressHydrationWarning>` exists because the head script changes
`<html>`'s class before React hydrates. Without it, React reports a
mismatch.

## 5. What goes in a loader, and what doesn't

**Did:** The home loader fetches one thing, the public repo count from
GitHub. Content is imported directly into components.

**Instead:** Return all content from every loader.

**Why:** A loader is for data that can change between requests. Content is
fixed at build time; routing it through a loader would serialise it into
every page for no benefit. The GitHub call lives in `github.server.ts`. The
`.server` suffix guarantees it never reaches the browser bundle.

It has a 2-second timeout, a 10-minute in-memory cache (GitHub allows 60
unauthenticated requests per hour per IP), and a fallback count from
`repos.ts`. Try the fallback with `GITHUB_OFFLINE=1 npm run dev`. The page
never breaks because a third party is down.

The loader also sets `Cache-Control`, which only reaches the browser because
the route exports `headers()`. Loader headers aren't sent automatically.

## 6. Real 404s

**Did:** An unknown slug *throws* `data("…", { status: 404 })` from the
loader. The route's `ErrorBoundary` renders the "not found" page.

**Instead:** Return `null` and render "not found" in the component.

**Why:** Returning `null` produces a 200 response with "not found" text,
which is a lie to search engines and link checkers. Throwing gives a real
404 and keeps the component free of "what if it's missing" branches.

## 7. View transitions

**Did:** `viewTransition` on links. The milestone card's title and the
detail page's `<h1>` share `view-transition-name: milestone-title`, so the
title morphs between pages. The header has its own name so it stays still
while the page cross-fades.

**Why:** It's the browser's native API; React Router just wraps navigation
in `document.startViewTransition()`. A `view-transition-name` must be unique
on the page, so a card only takes the name while it's the one being opened
(`useViewTransitionState`). Browsers without the API simply navigate.

---

## Things worth trying next

- Write the first real milestone. Then run `npm run build && npm start` and
  see the production page without the dev hints.
- Read `app/content/validate.ts` and add a rule of your own, for example
  "a `now` milestone must have evidence too".
- Deploy it. The scaffold includes a `Dockerfile`; Vercel and Netlify both
  support React Router's framework mode.
