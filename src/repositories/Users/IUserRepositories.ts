import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { User } from '@models/User';

export interface IUserRepository {
  findUserByName(user_name: string): Promise<User | undefined>;
  findById(user_id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
