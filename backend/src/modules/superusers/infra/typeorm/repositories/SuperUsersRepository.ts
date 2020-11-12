import AppError from '@shared/errors/AppError';
import CreateHashService from '@shared/services/CreateHashService';
import { getRepository, Repository } from 'typeorm';
import ISuperUsersRepository from '../../../repositories/ISuperUsersRepository';
import SuperUser from '../entities/SuperUser';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class SuperUsersRepository implements ISuperUsersRepository {
  private ormRepository: Repository<SuperUser>;

  constructor() {
    this.ormRepository = getRepository(SuperUser);
  }

  public async create({ name, email, password }: IRequest): Promise<SuperUser> {
    const superUserExist = await this.ormRepository.findOne({
      where: { email },
    });

    if (superUserExist) {
      throw new AppError('email has already been registered');
    }
    const createHashService = new CreateHashService();

    const hashedPassword = await createHashService.execute({ password });

    const createSuperUser = this.ormRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.ormRepository.save(createSuperUser);

    return createSuperUser;
  }

  public async findMail(email: string): Promise<SuperUser | undefined> {
    const superUser = await this.ormRepository.findOne({
      where: { email },
    });

    return superUser;
  }
}
