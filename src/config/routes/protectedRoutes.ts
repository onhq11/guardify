import { Route } from "@/utils/route";

export const protectedRoutes: Record<string, Route> = {
  panel: {
    href: "/panel",
    label: "Panel",
  },
  servers: {
    href: "/servers",
    label: "Servers",
  },
  server_details: {
    href: "/servers/:id",
    label: "Servers",
  },
};
