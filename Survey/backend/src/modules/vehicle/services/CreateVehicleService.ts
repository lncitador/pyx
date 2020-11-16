/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';
import ICreateVehicleDTO from '../dtos/ICreateVehicleDTO';
import Vehicle from '../infra/typeorm/entities/Vehicle';
import IVehicleRepository from '../repositories/IVehicleRepository';

@injectable()
class CreateVehicleService {
  constructor(
    @inject('VehicleRepository')
    private vehicleRepository: IVehicleRepository,
  ) {}

  public async execute({
    plate,
    driver,
    carrier_id,
  }: ICreateVehicleDTO): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.createVehicle({
      plate,
      driver,
      carrier_id,
    });

    return vehicle;
  }
}

export default CreateVehicleService;
