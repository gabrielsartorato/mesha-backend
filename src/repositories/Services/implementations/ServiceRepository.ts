import { ICreateServiceDTO } from '@dtos/ICreateServiceDTO';
import { Service } from '@models/Service';
import { getRepository, Repository } from 'typeorm';
import { IServiceRepository } from '../IServiceRepositories';

class ServiceRepository implements IServiceRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async create(data: ICreateServiceDTO): Promise<Service> {
    const service = this.ormRepository.create(data);

    return this.ormRepository.save(service);
  }

  public async findByName(name_service: string): Promise<Service | undefined> {
    const service = await this.ormRepository.findOne({
      where: {
        name_service,
      },
    });

    return service;
  }
}

export { ServiceRepository };
