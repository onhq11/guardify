import { routes } from "@/config/routes/routes";
import { protectedRoutes } from "@/config/routes/protectedRoutes";

export type Route = { href: string; label: string };

export const getRouteInfoByUrl = (route: string) => {
  return getRoute((item: any) => isMatch(item.href, route));
};

export function generatePath(route: any, params: any = {}) {
  return route.replace(/:(\w+)/g, (_: any, key: any) => {
    if (params[key] !== undefined) {
      return params[key];
    }
    throw new Error(`Missing parameter: ${key}`);
  });
}

export const isMatch = (url: string, url2: string) => {
  const regexPattern = url.replace(/:[^\s/]+/g, "([\\w-]+)");
  const regex = new RegExp(`^${regexPattern}$`);

  return regex.test(url2);
};

export const isProtectedRoute = (href: string) =>
  Object.values(protectedRoutes).some((route) => {
    return isMatch(route.href, href);
  });

const getRoute = (callback: (item: any) => boolean): Route => {
  const routesArray = Object.values(routes);
  const protectedRoutesArray = Object.values(protectedRoutes);
  const failbackRoute = routes.index;
  const combinedRoutes = [...routesArray, ...protectedRoutesArray];
  return <Route>combinedRoutes.find(callback) || failbackRoute;
};
