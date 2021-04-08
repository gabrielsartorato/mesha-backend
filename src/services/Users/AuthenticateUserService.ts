import { sign } from 'jsonwebtoken';

import AppError from '@errors/AppError';
import { User } from '@models/User';
import { IUserRepository } from '@repositories/Users/IUserRepositories';
import authConfig from '@config/auth';
import IHashProvider from '@providers/HashProvider/IHashProvider';

interface IRequest {
  user_name: string;
  password: string;
}

interface IResponse {
  token: string;
  user: User;
}

export class AuthenticateUserService {
  private readonly userRepository: IUserRepository;

  private readonly hashProvider: IHashProvider;

  constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ user_name, password }: IRequest): Promise<IResponse> {
    const userNameLowerCase = user_name.toLowerCase();
    const user = await this.userRepository.findUserByName(userNameLowerCase);

    console.log(user);

    if (!user) {
      throw new AppError('Invalid user name');
    }

    const comparePassword = await this.hashProvider.compareHash(
      user.password,
      password,
    );

    if (!comparePassword) {
      throw new AppError('Invalid combination email/password');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      token,
      user,
    };
  }
}
