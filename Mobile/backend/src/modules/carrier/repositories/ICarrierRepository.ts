import ICreatedCarrierDTO from '../dtos/ICreateCarrierDTO';
import Carrier from '../infra/typeorm/entities/Carrier';

export default interface IAdminRepository {
  create(data: ICreatedCarrierDTO): Promise<Carrier>;
}
