import { CustomLogger } from '../customLogger';

export class CustomLoggerDouble implements CustomLogger {
  debug: jest.MockedFunction<any>;
  info: jest.MockedFunction<any>;
  error: jest.MockedFunction<any>;

  constructor() {
    this.debug = jest.fn();
    this.info = jest.fn();
    this.error = jest.fn();
  }
}
