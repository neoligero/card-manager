
import { Container } from 'inversify';
import { CustomLogger, WinstonLogger } from './';

export const bindToContainer = (container: Container) => {
  // Controllers
  container.bind<CustomLogger>('CustomLogger').to(WinstonLogger);
};