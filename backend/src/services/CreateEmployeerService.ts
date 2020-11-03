import Employeer from '../models/Employeer';
import EmployeersRepository from '../repositories/EmployeersRepository';

interface Request {
  fullName: string;
  cpf: number;
  adress: string;
  number: number;
  city: string;
  borne: string;
  subsidiary: string;
}

class CreateEmployeerService {
  private employeersRepository: EmployeersRepository;

  constructor(employeersRepository: EmployeersRepository) {
    this.employeersRepository = employeersRepository;
  }

  public execute(data: Request): Employeer {
    const employeerExist = this.employeersRepository.findCPF(data.cpf);

    if (employeerExist) {
      throw Error('cpf already exist');
    }

    const employeer = this.employeersRepository.create(data);

    return employeer;
  }
}

export default CreateEmployeerService;
