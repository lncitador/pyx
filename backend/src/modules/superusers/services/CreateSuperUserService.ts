import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CreateHashService from '@shared/services/CreateHashService';
import SuperUser from '../infra/typeorm/entities/SuperUser';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateSuperUserService {
  public async execute({ name, email, password }: Request): Promise<SuperUser> {
    const superUserRepository = getRepository(SuperUser);
    const superUserExist = await superUserRepository.findOne({
      where: { email },
    });

    if (superUserExist) {
      throw new AppError('email has already been registered');
    }
    const createHashService = new CreateHashService();

    const hashedPassword = await createHashService.execute({ password });

    const createSuperUser = await superUserRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await superUserRepository.save(createSuperUser);

    return createSuperUser;
  }
}

export default CreateSuperUserService;
