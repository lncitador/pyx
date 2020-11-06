import { getRepository } from 'typeorm';
import Admins from '../models/Admins';

interface Request {
  name: string;
  password: string;
}

class CreateAdminService {
  public async execute(data: Request): Promise<Admins> {
    const adminRepository = getRepository(Admins);

    const admin = adminRepository.create(data);

    await adminRepository.save(admin);

    return admin;
  }
}

export default CreateAdminService;
