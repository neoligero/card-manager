export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface UserParams extends CreateUserParams {
  _id: string;
}

export class User {
  _id: string;
  name: string;
  email: string;
  password: string;

  constructor(params: UserParams) {
    this._id = params._id;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
  }
}