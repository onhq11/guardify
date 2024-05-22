export const response = {
  OK: "ok",
  INTERNAL_SERVER_ERROR: "internal_server_error",
  INVALID_USAGE: "invalid_usage",
};

export type Response = (typeof response)[keyof typeof response];
