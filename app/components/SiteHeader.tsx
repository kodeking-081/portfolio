import { Link, NavLink } from "react-router";
import { site } from "~/content/site";
import { cx } from "~/lib/cx";

const links = [
  { to: "/", label: "Tracks", end: true },
  { to: "/evidence", label: "Evidence", end: false },
  { to: "/about", label: "About", end: false },
];

export function SiteHeader() {
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
