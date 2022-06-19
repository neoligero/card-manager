import { User, UserRepository } from '@modules/users/domain';
import { MongooseBaseRepository } from '@shared/repository';
import { injectable } from 'inversify';
import { UserModel } from './userModel';

@injectable()
export class UserMongooseRepository extends MongooseBaseRepository<User> implements UserRepository {
  constructor(userModel = UserModel) {
    super(User, userModel);
  }

  async insertOne(user: User): Promise<User> {
    const createdUser = await this.model.create(user);
    return this.toObjectDomain(createdUser);
  }

  async getOneById(_id: string): Promise<User | null> {
    const result = await this.model.findOne({ _id }).lean().exec();
    if (!result) {
      return null;
    }
    return this.toObjectDomain(result);
  }

}
