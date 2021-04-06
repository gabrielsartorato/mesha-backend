export default interface IHashProvider {
  generateHash(password: string): Promise<string>;
  compareHash(hashString: string, payload: string): Promise<boolean>;
}
