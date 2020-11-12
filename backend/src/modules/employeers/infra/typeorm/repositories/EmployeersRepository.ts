import { EntityRepository, Repository } from 'typeorm';
import Employeer from '../entities/Employeer';

@EntityRepository(Employeer)
class EmployeersRepository extends Repository<Employeer> {
  public async findCPF(cpf: string): Promise<Employeer | null> {
    const cpfExist = await this.findOne({
      where: { cpf },
    });

    return cpfExist || null;
  }
}

export default EmployeersRepository;
