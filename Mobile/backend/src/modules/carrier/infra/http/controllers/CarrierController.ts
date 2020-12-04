import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarrierService from '@modules/carrier/services/CreateCarrierService';
import IResponseCarrierDTO from '@modules/carrier/dtos/IResponseCarrierDTO';
import CarrierRepository from '../../typeorm/repositories/CarrierRepository';

export default class CarrierController {
  public async index(request: Request, response: Response): Promise<Response> {
    const carrierRepository = container.resolve(CarrierRepository);

    const { id } = request.params;

    const carrier = await carrierRepository.IndexCarrier(id);

    return response.json(carrier);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const carrierRepository = container.resolve(CarrierRepository);

    const carriers = await carrierRepository.showCarriers();

    return response.json(carriers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createCarrierService = container.resolve(CreateCarrierService);

    const {
      name,
      cnpj,
      responsible,
      email,
      address,
      phone,
    }: IResponseCarrierDTO = request.body;

    const addressParsed = JSON.stringify(address);

    const createCarrier = await createCarrierService.execute({
      name,
      cnpj,
      responsible,
      email,
      address: addressParsed,
      phone,
    });

    return response.json(createCarrier);
  }
}
