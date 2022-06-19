import { User } from '../entities/user';

export interface UserRepository {
  insertOne(user: User): Promise<User>;
  getOneById(userId: string): Promise<User | null>;
}
