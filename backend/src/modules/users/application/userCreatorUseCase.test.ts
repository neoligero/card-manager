import { UserCreator } from './userCreatorUseCase';
import { CustomLoggerDouble } from '@shared/logger/test/customLoggerDouble';
import { UserRepositoryDouble } from '../test/userRepositoryDouble';

describe('Create User', () => {
  const logger = new CustomLoggerDouble();
  const userRepository = new UserRepositoryDouble();

  const useCase = new UserCreator(logger, userRepository);

  beforeEach(() => {
    userRepository.insertOne = jest.fn().mockReturnValue("mockUser");
    logger.info = jest.fn();
  });

  it('logs request params', async () => {
    const params = requestFrom();
    await useCase.invoke(params);

    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('Invoking CreateUser...', { params });
  });

  const requestFrom = () => ({
    name: 'name',
    email: 'email@email.com',
    password: 'password',
  });
});