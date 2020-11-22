import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IEmployeersRepository from '../repositories/IEmployeersRepository';

interface IUser {
  fullName: string;
  cpf: string;
  adress: string;
  number: number;
  city: string;
  borne: string;
  subsidiary: string;
}
interface IRequest {
  registry: string;
  cpf: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
export default class AuthenticateEmployeerService {
  constructor(
    @inject('EmployeersRepository')
    private employeerRepository: IEmployeersRepository,
  ) {}

  public async execute({ registry, cpf }: IRequest): Promise<IResponse> {
    const employeer = await this.employeerRepository.findRegistry(registry);

    if (!employeer) {
      throw new AppError('Bad combination');
    }

    if (cpf !== employeer.cpf) {
      throw new AppError('Bad combination');
    }

    const { fullName, adress, number, city, borne, subsidiary } = employeer;

    const user: IUser = {
      fullName,
      cpf,
      adress,
      number,
      city,
      borne,
      subsidiary,
    };

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: registry,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
