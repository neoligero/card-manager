import { UserRepository } from '../domain';

export class UserRepositoryDouble implements UserRepository {
  insertOne: jest.MockedFunction<any>;
  getOneById: jest.MockedFunction<any>;

  constructor() {
    this.insertOne = jest.fn();
    this.getOneById = jest.fn();
  }
}