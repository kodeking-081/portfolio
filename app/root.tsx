import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { MotionConfig } from "motion/react";

import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./app.css";

import type { Route } from "./+types/root";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { ScrollProgress } from "./components/motion/ScrollProgress";

// Runs before first paint. CSS keys off `.js` to hold animated elements at
// their start state; without JS they simply render their final state.
const markJs = `document.documentElement.classList.add("js")`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // The inline script mutates <html> before hydration, so React would
    // otherwise report a className mismatch here.
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: markJs }} />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-dvh flex-col font-sans">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {/* reducedMotion="user": every Motion animation below honours the
            visitor's prefers-reduced-motion setting automatically. */}
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionConfig>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let status = "Error";
  let message = "Something broke on this page.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    status = String(error.status);
    message =
      error.status === 404
        ? "There's nothing at this address."
        : error.statusText || message;
  } else if (import.meta.env.DEV && error instanceof Error) {
    message = error.message;
    stack = error.stack;
  }

  return (
    <main id="main" className="shell py-24">
      <p className="label text-accent-ink">{status}</p>
      <h1 className="display-lg mt-4 max-w-3xl">{message}</h1>
      <Link
        to="/"
        className="label mt-10 inline-block underline-offset-4 hover:underline"
      >
        ← Back to the tracks
      </Link>
      {stack && (
        <pre className="mt-10 overflow-x-auto rounded border border-line p-4 text-xs">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
