import IEmployeersRepository from '@modules/employeers/repositories/IEmployeersRepository';
import { getRepository, Repository } from 'typeorm';
import Employeer from '../entities/Employeer';

interface IRequest {
  fullName: string;
  cpf: string;
  adress: string;
  number: number;
  city: string;
  borne: string;
  subsidiary: string;
}

class EmployeersRepository implements IEmployeersRepository {
  private ormRepository: Repository<Employeer>;

  constructor() {
    this.ormRepository = getRepository(Employeer);
  }

  public async findCPF(cpf: string): Promise<Employeer | undefined> {
    const cpfExist = await this.ormRepository.findOne({
      where: { cpf },
    });

    return cpfExist || undefined;
  }

  public async create(data: IRequest): Promise<Employeer> {
    const employeer = this.ormRepository.create(data);

    await this.ormRepository.save(employeer);

    return employeer;
  }

  public async all(): Promise<Employeer[]> {
    const employeers = this.ormRepository.find();
    return employeers;
  }
}

export default EmployeersRepository;
