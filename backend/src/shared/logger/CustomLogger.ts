export interface CustomLogger {
  debug(message: string, additionalFields?: Record<string, unknown>): void;
  info(message: string, additionalFields?: Record<string, unknown>): void;
  error(message: string, additionalFields?: Record<string, unknown>): void;
}
