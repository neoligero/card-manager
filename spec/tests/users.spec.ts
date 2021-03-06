import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test, Response } from 'supertest';

import app from '@server';
import userDao from 'src/repos/user-repo';
import { User } from '@modules/users/domain';
import { pErr } from '@shared/functions';
import { ParamMissingError, UserNotFoundError } from '@shared/errors';
import { IdGenerator } from 'src/test/idGenerator';

type TReqBody = string | object | undefined;


describe('user-router', () => {

  const usersPath = '/users';
  const getUserPath = `${ usersPath }/`;
  const addUsersPath = `${ usersPath }/`;
  /*const updateUserPath = `${ usersPath }${ userPaths.update }`;
  const deleteUserPath = `${ usersPath }${ userPaths.delete }`;*/

  const { BAD_REQUEST, CREATED, OK } = StatusCodes;
  let agent: SuperTest<Test>;

  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });


  /***********************************************************************************
   *                                    Test Get
   **********************************************************************************/

  /*describe(`"GET:${ getUserPath }"`, () => {

    it(`should return a JSON object with all the users and a status code of "${ OK }" if the
            request was successful.`, (done) => {
      // Setup spy
      const users = [
        new User({ _id: IdGenerator.generate(), name: 'Sean Maxwell', email: 'sean.maxwell1@gmail.com', password: '123456' }),
        new User({ _id: IdGenerator.generate(), name: 'Sean Maxwell', email: 'sean.maxwell2@gmail.com', password: '123456' }),
        new User({ _id: IdGenerator.generate(), name: 'Sean Maxwell', email: 'sean.maxwell3@gmail.com', password: '123456' }),
      ];
      spyOn(userDao, 'getAll').and.returnValue(Promise.resolve(users));
      // Call API
      agent.get(getUserPath)
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(OK);
          // Caste instance-objects to 'User' objects
          const respUsers = res.body.users;
          const retUsers: User[] = respUsers.map((user: User) => {
            return new User(user);
          });
          expect(retUsers).toEqual(users);
          expect(res.body.error).toBeUndefined();
          done();
        });
    });

    it(`should return a JSON object containing an error message and a status code of
            "${ BAD_REQUEST }" if the request was unsuccessful.`, (done) => {
      // Setup spy
      const errMsg = 'Could not fetch users.';
      spyOn(userDao, 'getAll').and.throwError(errMsg);
      // Call API
      agent.get(getUserPath)
        .end((err: Error, res: Response) => {
          pErr(err);
          console.log(res.body)
          expect(res.status).toBe(BAD_REQUEST);
          expect(res.body.error).toBe(errMsg);
          done();
        });
    });
  });*/


  /***********************************************************************************
   *                                    Test Post
   **********************************************************************************/

  describe(`"POST:${ addUsersPath }"`, () => {

    const callApi = (reqBody: TReqBody) => {
      return agent.post(addUsersPath).type('form').send(reqBody);
    };
    const userData = { name: 'Sean Maxwell', email: 'sean.maxwell@gmail.com', password: '123456' };

    it(`should return a status code of "${ CREATED }" if the request was successful.`, (done) => {
      // Setup Spy
      spyOn(userDao, 'add').and.returnValue(Promise.resolve());
      // Call API
      agent.post(addUsersPath).type('form').send(userData)
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(CREATED);
          expect(res.body.error).toBeUndefined();
          done();
        });
    });

    /*it(`should return a JSON object with an error message of "${ ParamMissingError.Msg }" and a status
            code of "${ BAD_REQUEST }" if the user param was missing.`, (done) => {
      // Call API
      callApi({})
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(BAD_REQUEST);
          expect(res.body.error).toBe(ParamMissingError.Msg);
          done();
        });
    });*/

    /*it(`should return a JSON object with an error message and a status code of "${ BAD_REQUEST }"
            if the request was unsuccessful.`, (done) => {
      // Setup spy
      const errMsg = 'Could not add user.';
      spyOn(userDao, 'add').and.throwError(errMsg);
      // Call API
      callApi(userData)
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(BAD_REQUEST);
          expect(res.body.error).toBe(errMsg);
          done();
        });
    });*/
  });


  /***********************************************************************************
   *                                    Test Put
   **********************************************************************************/

  /*describe(`"PUT:${ updateUserPath }"`, () => {

    const callApi = (reqBody: TReqBody) => {
      return agent.put(updateUserPath).type('form').send(reqBody);
    };
    const userData = {
      user: User.new('Gordan Freeman', 'gordan.freeman@gmail.com'),
    };

    it(`should return a status code of "${ OK }" if the request was successful.`, (done) => {
      // Setup spy
      spyOn(userDao, 'persists').and.returnValue(Promise.resolve(true));
      spyOn(userDao, 'update').and.returnValue(Promise.resolve());
      // Call Api
      callApi(userData)
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(OK);
          expect(res.body.error).toBeUndefined();
          done();
        });
    });

    it(`should return a JSON object with an error message of "${ ParamMissingError.Msg }" and a
            status code of "${ BAD_REQUEST }" if the user param was missing.`, (done) => {
      // Call api
      callApi({})
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(BAD_REQUEST);
          expect(res.body.error).toBe(ParamMissingError.Msg);
          done();
        });
    });

    it(`should return a JSON object with the error message of ${ UserNotFoundError.Msg }
            and a status code of "${ StatusCodes.NOT_FOUND }" if the id was not found.`, (done) => {
      // Call api
      callApi(userData)
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(UserNotFoundError.HttpStatus);
          expect(res.body.error).toBe(UserNotFoundError.Msg);
          done();
        });
    });

    it(`should return a JSON object with an error message and a status code of "${ BAD_REQUEST }"
            if the request was unsuccessful.`, (done) => {
      spyOn(userDao, 'persists').and.returnValue(Promise.resolve(true));
      // Setup spy
      const updateErrMsg = 'Could not update user.';
      spyOn(userDao, 'update').and.throwError(updateErrMsg);
      // Call API
      callApi(userData)
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(BAD_REQUEST);
          expect(res.body.error).toBe(updateErrMsg);
          done();
        });
    });
  });*/


  /***********************************************************************************
   *                                    Test Delete
   **********************************************************************************/

  /*describe(`"DELETE:${ deleteUserPath }"`, () => {

    const callApi = (id: number) => {
      return agent.delete(deleteUserPath.replace(':id', id.toString()));
    };

    it(`should return a status code of "${ OK }" if the request was successful.`, (done) => {
      // Setup spy
      spyOn(userDao, 'persists').and.returnValue(Promise.resolve(true));
      spyOn(userDao, 'delete').and.returnValue(Promise.resolve());
      // Call api
      callApi(5)
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(OK);
          expect(res.body.error).toBeUndefined();
          done();
        });
    });

    it(`should return a JSON object with the error message of ${ UserNotFoundError.Msg }
            and a status code of "${ StatusCodes.NOT_FOUND }" if the id was not found.`, (done) => {
      // Call api
      callApi(-1)
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(StatusCodes.NOT_FOUND);
          expect(res.body.error).toBe(UserNotFoundError.Msg);
          done();
        });
    });

    it(`should return a JSON object with an error message and a status code of "${ BAD_REQUEST }"
            if the request was unsuccessful.`, (done) => {
      spyOn(userDao, 'persists').and.returnValue(Promise.resolve(true));
      // Setup spy
      const deleteErrMsg = 'Could not delete user.';
      spyOn(userDao, 'delete').and.throwError(deleteErrMsg);
      // Call Api
      callApi(1)
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(BAD_REQUEST);
          expect(res.body.error).toBe(deleteErrMsg);
          done();
        });
    });
  });*/
});
