import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message: string) {
    console.log(message);
  }

  error(message: string, trace: string) {
    console.error(`Error: ${message}`, trace);
  }

  warn(message: string) {
    console.warn(`Warning: ${message}`);
  }

  debug(message: string) {
    console.debug(`Debug: ${message}`);
  }

  // You can also extend it to log to external services or files, etc.
}
