import ICreateVehicleDTO from '../dtos/ICreateVehicleDTO';
import Vehicle from '../infra/typeorm/entities/Vehicle';

export default interface IVehicleRepository {
  findVehicle(plate: string): Promise<Vehicle | undefined>;
  createVehicle(data: ICreateVehicleDTO): Promise<Vehicle>;
}
