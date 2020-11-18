import ICreatedAdminDTO from '../dtos/ICreateAdminDTO';
import Admins from '../infra/typeorm/entities/Admins';

export default interface IAdminRepository {
  create(data: ICreatedAdminDTO): Promise<Admins>;
}
