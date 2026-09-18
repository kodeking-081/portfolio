import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("m/:slug", "routes/milestone.tsx"),
  route("evidence", "routes/evidence.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
