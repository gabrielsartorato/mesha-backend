import { ICreateServiceDTO } from '@dtos/ICreateServiceDTO';
import AppError from '@errors/AppError';
import { Service } from '@models/Service';
import { IServiceRepository } from '@repositories/Services/IServiceRepositories';

class CreateService {
  private readonly serviceRepository: IServiceRepository;

  constructor(serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  public async execute({
    name_service,
    minutes,
    price,
  }: ICreateServiceDTO): Promise<Service> {
    const checkIfExist = await this.serviceRepository.findByName(name_service);

    if (checkIfExist) {
      throw new AppError('Já existe um serviço com este nome');
    }

    const service = await this.serviceRepository.create({
      name_service,
      minutes,
      price,
    });

    return service;
  }
}

export { CreateService };
