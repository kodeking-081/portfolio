import { Link, NavLink } from "react-router";
import { milestones } from "~/content";
import { site } from "~/content/site";
import { cx } from "~/lib/cx";

const links = [
  { to: "/", label: "Tracks", end: true },
  { to: "/evidence", label: "Evidence", end: false },
  { to: "/about", label: "About", end: false },
];

export function SiteHeader() {
  const current = milestones.find((m) => m.status === "now");

  return (
    <header className="site-header sticky top-0 z-40 border-b border-line bg-ground/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          viewTransition
          className="font-display text-xl font-extrabold tracking-tight"
        >
          {site.wordmark}
          <span className="text-accent-ink">.</span>
        </Link>
        <div className="flex items-center gap-6">
          {current && (
            <Link
              to={`/m/${current.slug}`}
              viewTransition
              className="hidden max-w-72 items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 text-xs text-ink-muted transition-colors hover:border-now hover:text-ink lg:flex"
            >
              <span className="status-dot status-dot--now shrink-0 text-now" aria-hidden="true" />
              <span className="truncate">
                <span className="text-ink">Now:</span> {current.title}
              </span>
            </Link>
          )}
          <nav aria-label="Primary">
            <ul className="label flex gap-4 sm:gap-6">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    viewTransition
                    className={({ isActive }) =>
                      cx(
                        "py-2 transition-colors hover:text-ink",
                        isActive ? "text-ink" : "text-ink-muted",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
