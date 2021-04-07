import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { User } from '@models/User';
import { getRepository, Repository } from 'typeorm';
import { IUserRepository } from '../IUserRepositories';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(user_id);

    return findUser;
  }

  public async findUserByName(user_name: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { user_name },
    });

    return findUser;
  }

  public async create({
    user_name,
    password,
    type,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ user_name, password, type });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export { UserRepository };
