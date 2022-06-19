import { CustomLogger } from '@shared/logger';
import { UseCase } from '@shared/usecase';
import { inject, injectable } from 'inversify';
import { CreateUserParams, User, UserRepository } from '../domain';

export type UserCreatorUseCase = UseCase<CreateUserParams, Promise<User>>;

@injectable()
export class UserCreator implements UserCreatorUseCase {
  constructor(
    @inject('CustomLogger') private logger: CustomLogger,
    @inject('UserRepository') private userRepository: UserRepository,
  ) { }

  async invoke(params: CreateUserParams) {
    this.logInvoke(params);

    return await this.userRepository.insertOne(params);
  }

  private logInvoke(params: CreateUserParams) {
    this.logger.info(`${ this.constructor.name } was invoked.`, { params });
  }

}
