

import { Container } from 'inversify';
import { UserCreator, UserCreatorUseCase } from './application/userCreatorUseCase';
import { UserRepository } from './domain';
import { UserMongooseRepository } from './infrastruture/persistence/userMongooseRepository';
import { UserController } from './infrastruture/rest/userController';

export const bindToContainer = (container: Container) => {
  // Repository
  container.bind<UserRepository>('UserRepository').to(UserMongooseRepository);

  // UseCase
  container.bind<UserCreatorUseCase>('UserCreator').to(UserCreator);

  // Controller
  container.bind<UserController>('UserController').to(UserController);
};