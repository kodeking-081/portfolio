import type { Config } from "@react-router/dev/config";
import { milestones } from "./app/content/milestones";
import { validateContent } from "./app/content/validate";

// Evaluated by both `react-router dev` and `react-router build`, so invalid
// content stops either one before anything is served or shipped.
validateContent();

export default {
  ssr: true,
  async prerender() {
    return [
      "/",
      "/about",
      "/evidence",
      ...milestones.map((m) => `/m/${m.slug}`),
    ];
  },
} satisfies Config;

