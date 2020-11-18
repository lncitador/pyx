import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Employeer from '../infra/typeorm/entities/Employeer';
import IEmployeersRepository from '../repositories/IEmployeersRepository';

interface IRequest {
  fullName: string;
  cpf: string;
  adress: string;
  number: number;
  city: string;
  borne: string;
  subsidiary: string;
}

@injectable()
class CreateEmployeerService {
  constructor(
    @inject('EmployeersRepository')
    public employeersRepository: IEmployeersRepository,
  ) {}

  public async execute(data: IRequest): Promise<Employeer> {
    const employeer = await this.employeersRepository.findCPF(data.cpf);

    if (employeer) {
      throw new AppError('cpf already exist');
    }

    const createEmployeer = await this.employeersRepository.create(data);

    return createEmployeer;
  }
}

export default CreateEmployeerService;
