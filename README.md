# subash.

A technical milestone tracker: what I can build, grouped by area, each claim
backed by the repo that proves it.

Built with React Router v8 (framework mode), TypeScript, Tailwind CSS v4 and
Motion.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run build        # typechecks, validates content, then builds
npm start            # serves the production build on http://localhost:3000
```

`GITHUB_OFFLINE=1` skips the live GitHub call and uses the local repo count.

## Where things live

| Path | What |
|---|---|
| `app/content/milestones.ts` | The milestones. Add one per capability. |
| `app/content/tracks.ts` | Technical areas; order = chapter order. |
| `app/content/repos.ts` | Repos that can be cited as evidence. |
| `app/content/site.ts` | Name, headline, intro, about. |
| `app/routes/` | `home`, `milestone` (`/m/:slug`), `evidence`, `about`. |
| `app/components/motion/` | The animations. |

Adding a milestone, and why everything is built the way it is:
**[LEARNING.md](LEARNING.md)**.

## Deploy

The scaffold's `Dockerfile` still works:

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

Or deploy the output of `npm run build` (`build/client` + `build/server`) to
any Node host.
