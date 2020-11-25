import ICreateVehicleDTO from '@modules/vehicle/dtos/ICreateVehicleDTO';
import CreateVehicleService from '@modules/vehicle/services/CreateVehicleService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import VehicleRepository from '../../typeorm/repositories/VehicleRepository';

export default class VehicleController {
  public async show(request: Request, response: Response): Promise<Response> {
    const vehicleRepository = container.resolve(VehicleRepository);

    const vehicles = await vehicleRepository.showVehicles();

    return response.json(vehicles);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const vehicleRepository = container.resolve(VehicleRepository);

    const { plate } = request.params;

    const vehicle = await vehicleRepository.findVehicle(plate);

    if (!vehicle) {
      throw new AppError('Plate as not found');
    }

    const { carrier } = vehicle;

    vehicle.carrier.address = carrier.address
      ? JSON.parse(carrier.address)
      : carrier.address;

    return response.json(vehicle);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createVehicleService = container.resolve(CreateVehicleService);
    const data: ICreateVehicleDTO = request.body;

    const vehicle = await createVehicleService.execute(data);

    return response.json(vehicle);
  }
}
