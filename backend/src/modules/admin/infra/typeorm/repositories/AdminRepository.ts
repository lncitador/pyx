import ICreatedAdminDTO from '@modules/admin/dtos/ICreateAdminDTO';
import IAdminRepository from '@modules/admin/repositories/IAdminRepository';
import { getRepository, Repository } from 'typeorm';
import Admins from '../entities/Admins';

export default class AdminRepository implements IAdminRepository {
  private ormRepository: Repository<Admins>;

  constructor() {
    this.ormRepository = getRepository(Admins);
  }

  public async create({ name, password }: ICreatedAdminDTO): Promise<Admins> {
    const admin = this.ormRepository.create({
      name,
      password,
    });

    await this.ormRepository.save(admin);

    return admin;
  }
}
