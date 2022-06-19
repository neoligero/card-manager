import { CreateUserParams, User } from '../entities/user';

export interface UserRepository {
  insertOne(user: CreateUserParams): Promise<User>;
  getOneById(userId: string): Promise<User | null>;
}
