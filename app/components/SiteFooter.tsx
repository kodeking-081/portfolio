import { site } from "~/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="shell flex flex-col gap-4 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold">{site.name}</p>
          <p className="mt-1 text-sm text-ink-muted">{site.headline}</p>
        </div>
        <ul className="label flex gap-6 text-ink-muted">
          <li>
            <a
              href={site.github}
              className="hover:text-ink"
              rel="noreferrer"
              target="_blank"
            >
              GitHub ↗
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
