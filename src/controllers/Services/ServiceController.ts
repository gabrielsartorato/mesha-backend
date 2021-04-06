import { ICreateServiceDTO } from '@dtos/ICreateServiceDTO';
import { ServiceRepository } from '@repositories/Services/implementations/ServiceRepository';
import { CreateService } from '@services/Services/CreateService';
import { Request, Response } from 'express';

class ServiceController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name_service, minutes, price }: ICreateServiceDTO = request.body;

    const serviceRepository = new ServiceRepository();
    const createService = new CreateService(serviceRepository);

    const service = await createService.execute({
      name_service,
      minutes,
      price,
    });

    return response.json(service);
  }
}

export { ServiceController };
