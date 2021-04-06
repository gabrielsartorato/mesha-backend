import { ICreateServiceDTO } from '@dtos/ICreateServiceDTO';
import { Service } from '@models/Service';

export interface IServiceRepository {
  create(data: ICreateServiceDTO): Promise<Service>;
  findByName(name_service: string): Promise<Service | undefined>;
}
