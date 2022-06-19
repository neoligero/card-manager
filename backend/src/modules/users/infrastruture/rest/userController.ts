import "reflect-metadata";
import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { UserCreatorUseCase } from "@modules/users/application";

const { CREATED, OK } = StatusCodes;

@injectable()
export class UserController {
  constructor(
    @inject('UserCreatorUseCase') private userCreator: UserCreatorUseCase
  ) { }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.body;
      console.log(req.body);
      const userCreated = await this.userCreator.invoke(user);
      return res.status(CREATED).json(userCreated);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      // const userCreated = await this.usecase.invoke(user);
      return res.status(OK).json('Hello');
    } catch (err) {
      next(err);
    }
  }

}