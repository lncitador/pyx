import { getCustomRepository } from 'typeorm';
import Employeer from '../models/Employeer';
import EmployeersRepository from '../repositories/EmployeersRepository';

interface Request {
  fullName: string;
  cpf: string;
  adress: string;
  number: number;
  city: string;
  borne: string;
  subsidiary: string;
}

class CreateEmployeerService {
  public async execute(data: Request): Promise<Employeer> {
    const employeersRepository = getCustomRepository(EmployeersRepository);
    const employeerExist = await employeersRepository.findCPF(data.cpf);

    if (employeerExist) {
      throw Error('cpf already exist');
    }

    const employeer = employeersRepository.create(data);

    await employeersRepository.save(employeer);

    return employeer;
  }
}

export default CreateEmployeerService;
