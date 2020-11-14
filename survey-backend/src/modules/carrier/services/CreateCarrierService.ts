import { inject, injectable } from 'tsyringe';
import ICreatedCarrierDTO from '../dtos/ICreateCarrierDTO';
import Carrier from '../infra/typeorm/entities/Carrier';
import ICarrierRepository from '../repositories/ICarrierRepository';

@injectable()
class CreateCarrierService {
  constructor(
    @inject('CarrierRepository')
    private carrierRepository: ICarrierRepository,
  ) {}

  public async execute({
    name,
    responsible,
    email,
    adress,
    phone,
  }: ICreatedCarrierDTO): Promise<Carrier> {
    const carrier = await this.carrierRepository.create({
      name,
      responsible,
      email,
      adress,
      phone,
    });

    return carrier;
  }
}

export default CreateCarrierService;
