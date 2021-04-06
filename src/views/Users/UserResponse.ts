import { User } from '@models/User';

interface UserResponse {
  id: string;
  name: string;
}

export function userResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.user_name,
  };
}
