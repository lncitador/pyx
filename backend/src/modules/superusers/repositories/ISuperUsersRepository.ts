import SuperUser from '../infra/typeorm/entities/SuperUser';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default interface ISuperUsersRepository {
  create(data: IRequest): Promise<SuperUser>;
  findMail(email: string): Promise<SuperUser | undefined>;
}
