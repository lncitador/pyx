import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import SuperUser from '../infra/typeorm/entities/SuperUser';

interface User {
  id: string;
  name: string;
  email: string;
}
interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const superUserRepository = getRepository(SuperUser);

    const superUser = await superUserRepository.findOne({
      where: { email },
    });

    if (!superUser) {
      throw new AppError('Bad combination');
    }

    const passwordCheck = compare(password, superUser.password);

    if (!passwordCheck) {
      throw new AppError('Bad combination');
    }

    const user: User = {
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
