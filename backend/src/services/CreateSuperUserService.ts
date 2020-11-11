import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import SuperUser from '../models/SuperUser';
import CreateHashService from './CreateHashService';

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
