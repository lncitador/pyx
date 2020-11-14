import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarrierService from '@modules/carrier/services/CreateCarrierService';
import ICreatedCarrierDTO from '@modules/carrier/dtos/ICreateCarrierDTO';
import CarrierRepository from '../../typeorm/repositories/CarrierRepository';

export default class CarrierController {
  public async show(request: Request, response: Response): Promise<Response> {
    const carrierRepository = container.resolve(CarrierRepository);

    const carriers = await carrierRepository.showCarriers();

    return response.json(carriers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createCarrierService = container.resolve(CreateCarrierService);

    const data: ICreatedCarrierDTO = request.body;

    const createCarrier = await createCarrierService.execute(data);

    return response.json(createCarrier);
  }
}
