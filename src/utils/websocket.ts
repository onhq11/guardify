import { Command } from "@/consts/Websockets/command";

export const buildRequest = (message: Command | string) => {
  return JSON.stringify({ request: message });
};
