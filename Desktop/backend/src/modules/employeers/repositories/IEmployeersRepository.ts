import Employeer from '../infra/typeorm/entities/Employeer';

interface IRequest {
  fullName: string;
  cpf: string;
  adress: string;
  number: number;
  city: string;
  borne: string;
  subsidiary: string;
}

export default interface IEmployeersRepository {
  findCPF(cpf: string): Promise<Employeer | undefined>;
  create(data: IRequest): Promise<Employeer>;
  all(): Promise<Employeer[]>;
}
