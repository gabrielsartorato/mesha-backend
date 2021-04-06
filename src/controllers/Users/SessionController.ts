import { Request, Response } from 'express';

import { BCryptProvider } from '@providers/HashProvider/implementations/BCryptProvider';
import { UserRepository } from '@repositories/Users/implementations/UserRepository';
import { AuthenticateUserService } from '@services/Users/AuthenticateUserService';

import { userResponse } from '@views/Users/UserResponse';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_name, password } = request.body;

    const userRepository = new UserRepository();
    const hashProvider = new BCryptProvider();
    const authenticateUserService = new AuthenticateUserService(
      userRepository,
      hashProvider,
    );

    const { token, user } = await authenticateUserService.execute({
      user_name,
      password,
    });

    return response.json({ token, user: userResponse(user) });
  }
}

export { SessionController };
