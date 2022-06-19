import { model, ObjectId, Schema } from 'mongoose';
import { User } from '../../domain';

export const ENTITY_NAME = 'User';

const UserSchema: Schema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
},
  {
    timestamps: true
  });

export interface IUser extends Document, Omit<User, 'id'> {
  id: ObjectId;
}

export const UserModel = model<IUser>(ENTITY_NAME, UserSchema);