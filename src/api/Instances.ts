import { DOMAIN_NAME } from "@/api/api";

export function buildURL(path: string) {
  return DOMAIN_NAME + path;
}

export async function listInstances(callback?: any) {
  const res = await fetch(buildURL("/api/instance"), { method: "get" }).finally(
    callback,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function createInstance(data: any, callback?: any) {
  const res = await fetch(buildURL("/api/instance"), {
    method: "post",
    body: JSON.stringify(data),
  }).finally(callback);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const InstancesAPI = {
  LIST: {
    listInstances,
  },
  CREATE: {
    createInstance,
  },
};
