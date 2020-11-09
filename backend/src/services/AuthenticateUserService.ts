import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import SuperUser from '../models/SuperUser';

interface Request {
  email: string;
  password: string;
}
export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<SuperUser> {
    const superUserRepository = getRepository(SuperUser);

    const superUser = await superUserRepository.findOne({
      where: { email },
    });

    if (!superUser) {
      throw new Error('Bad combination');
    }

    const passwordCheck = compare(password, superUser.password);

    if (!passwordCheck) {
      throw new Error('Bad combination');
    }

    return superUser;
  }
}
