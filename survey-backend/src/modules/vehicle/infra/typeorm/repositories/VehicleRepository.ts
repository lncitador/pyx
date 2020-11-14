/* eslint-disable camelcase */
import ICreateVehicleDTO from '@modules/vehicle/dtos/ICreateVehicleDTO';
import IVehicleRepository from '@modules/vehicle/repositories/IVehicleRepository';
import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import Vehicle from '../entities/Vehicle';

export default class VehicleRepository implements IVehicleRepository {
  public ormRepository: Repository<Vehicle>;

  constructor() {
    this.ormRepository = getRepository(Vehicle);
  }

  public async showVehicles(): Promise<Vehicle[]> {
    const vehicles = await this.ormRepository.find({
      relations: ['carrier'],
    });

    return vehicles;
  }

  public async findVehicle(plate: string): Promise<Vehicle | undefined> {
    const vehicle = await this.ormRepository.findOne({
      where: { plate },
      relations: ['carrier'],
    });

    return vehicle;
  }

  public async createVehicle({
    plate,
    driver,
    carrier_id,
  }: ICreateVehicleDTO): Promise<Vehicle> {
    const findPlate = await this.ormRepository.findOne({
      where: { plate },
      relations: ['carrier'],
    });

    if (findPlate) {
      throw new AppError('this vehicle is already registered');
    }
    const vehicle = this.ormRepository.create({
      plate,
      driver,
      carrier_id,
    });

    await this.ormRepository.save(vehicle);

    return vehicle;
  }
}
