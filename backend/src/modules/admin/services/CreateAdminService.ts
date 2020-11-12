import { inject, injectable } from 'tsyringe';
import ICreatedAdminDTO from '../dtos/ICreateAdminDTO';
import Admins from '../infra/typeorm/entities/Admins';
import IAdminRepository from '../repositories/IAdminRepository';

@injectable()
class CreateAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,
  ) {}

  public async execute({ name, password }: ICreatedAdminDTO): Promise<Admins> {
    const admin = await this.adminRepository.create({ name, password });

    return admin;
  }
}

export default CreateAdminService;
