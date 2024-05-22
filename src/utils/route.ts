import { routes } from "@/config/routes/routes";
import { protectedRoutes } from "@/config/routes/protectedRoutes";

export type Route = { name: string; href: string; label: string };

export const getRouteInfoByUrl = (route: string) => {
  return getRoute((item: any) => item.href === route);
};

export const getRouteInfoByName = (name: string) => {
  return getRoute((item: any) => item.name === name);
};

export const isProtectedRoute = (href: string) =>
  protectedRoutes.some((route) => route.href === href);

const getRoute = (callback: (item: any) => boolean): Route => {
  const failbackRoute = routes.find((item) => item.name === "index");
  const combinedRoutes = [...routes, ...protectedRoutes];
  return <Route>combinedRoutes.find(callback) || failbackRoute;
};
