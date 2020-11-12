import { inject, injectable } from 'tsyringe';
import SuperUser from '../infra/typeorm/entities/SuperUser';
import ISuperUsersRepository from '../repositories/ISuperUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateSuperUserService {
  constructor(
    @inject('SuperUsersRepository')
    private superUsersRepository: ISuperUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<SuperUser> {
    const superUser = await this.superUsersRepository.create({
      name,
      email,
      password,
    });

    return superUser;
  }
}

export default CreateSuperUserService;
