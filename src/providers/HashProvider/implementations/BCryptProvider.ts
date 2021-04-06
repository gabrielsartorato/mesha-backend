import { hash, compare } from 'bcryptjs';

import IHashProvider from '../IHashProvider';

export class BCryptProvider implements IHashProvider {
  public async generateHash(password: string): Promise<string> {
    const hashPassword = await hash(password, 8);

    return hashPassword;
  }

  public async compareHash(
    hashString: string,
    payload: string,
  ): Promise<boolean> {
    const compareHash = await compare(payload, hashString);

    return compareHash;
  }
}
