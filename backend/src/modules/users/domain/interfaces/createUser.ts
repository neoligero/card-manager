import { UseCase } from '@shared/usecase';
import { CreateUserParams, User } from '../entities';

export type CreateUser = UseCase<CreateUserParams, Promise<User>>;