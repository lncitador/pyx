import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ISuperUsersRepository from '../repositories/ISuperUsersRepository';

interface IUser {
  id: string;
  name: string;
  email: string;
}
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('SuperUsersRepository')
    private superUserRepository: ISuperUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const superUser = await this.superUserRepository.findMail(email);

    if (!superUser) {
      throw new AppError('Bad combination');
    }

    const passwordCheck = compare(password, superUser.password);

    if (!passwordCheck) {
      throw new AppError('Bad combination');
    }

    const user: IUser = {
      id: superUser.id,
      name: superUser.name,
      email,
    };

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
