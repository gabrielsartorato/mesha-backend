import { TypePeople } from '@dtos/TypePeople.enum';
import AppError from '@errors/AppError';
import { User } from '@models/User';
import { IUserRepository } from '@repositories/Users/IUserRepositories';
import IHashProvider from 'providers/HashProvider/IHashProvider';

interface IRequest {
  user_name: string;
  password: string;
  type: string;
}

export class CreateUserservice {
  private readonly userRepository: IUserRepository;

  private readonly hashProvider: IHashProvider;

  constructor(userRepository: IUserRepository, hashProvider: IHashProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ user_name, password, type }: IRequest): Promise<User> {
    const checkExistingUser = await this.userRepository.findUserByName(
      user_name,
    );

    const peoplesTypes = ['ATENDENTE', 'NORMAL', 'PROFISSIONAL'];

    if (checkExistingUser) {
      throw new AppError('User already existing.');
    }

    if (!peoplesTypes.includes(type)) {
      throw new AppError('Tipo Usuário inválido');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      user_name,
      password: hashPassword,
      type,
    });

    return user;
  }
}
