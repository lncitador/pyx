import Employeer from '../models/Employeer';

interface CreateEmployeerDTO {
  fullName: string;
  cpf: number;
  adress: string;
  number: number;
  city: string;
  borne: string;
  subsidiary: string;
}

class EmployeersRepository {
  private employeers: Employeer[];

  constructor() {
    this.employeers = [];
  }

  public all(): Employeer[] {
    return this.employeers;
  }

  public create(data: CreateEmployeerDTO): Employeer {
    const employeer = new Employeer(data);

    this.employeers.push(employeer);

    return employeer;
  }

  public findCPF(cpf: number): Employeer | undefined {
    const employeerExist = this.employeers.find(
      employeer => employeer.cpf === cpf,
    );

    return employeerExist;
  }
}

export default EmployeersRepository;
