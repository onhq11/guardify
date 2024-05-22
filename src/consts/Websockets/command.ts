export const command = {
  LOGS_COMMAND: "get_logs",
  FORCE_BACKUP: "force_backup",
  GET_CONFIG: "get_config",
  GET_SYSTEM_INFO: "get_system_info",
  INIT: "init",
};

export type Command = (typeof command)[keyof typeof command];
