import { routes } from "@/config/routes";

export const getRouteInfo = (route: string) => {
  return Object.values(routes)?.find((item: any) => item.href === route);
};
