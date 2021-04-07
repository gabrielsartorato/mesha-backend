import { Request, Response } from 'express';

import { BCryptProvider } from '@providers/HashProvider/implementations/BCryptProvider';
import { UserRepository } from '@repositories/Users/implementations/UserRepository';
import { CreateUserservice } from '@services/Users/CreateUserService';

import { userResponse } from '@views/Users/UserResponse';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userRepository = new UserRepository();

    const users = await userRepository.findAll();

    const usersResponse = users.map((user) => userResponse(user));

    return response.json(usersResponse);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user_name, password, type } = request.body;

    const hashProvider = new BCryptProvider();
    const userRepository = new UserRepository();
    const createUserService = new CreateUserservice(
      userRepository,
      hashProvider,
    );

    const user = await createUserService.execute({ user_name, password, type });

    return response.json(userResponse(user));
  }
}

export { UserController };
