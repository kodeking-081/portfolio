import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Subash Subedi" }];
}

export default function Home() {
  return <main id="main" className="shell py-24" />;
}
