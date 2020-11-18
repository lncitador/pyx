import ICreatedCarrierDTO from '@modules/carrier/dtos/ICreateCarrierDTO';
import ICarrierRepository from '@modules/carrier/repositories/ICarrierRepository';
import { getRepository, Repository } from 'typeorm';
import Carrier from '../entities/Carrier';

export default class CarrierRepository implements ICarrierRepository {
  private ormRepository: Repository<Carrier>;

  constructor() {
    this.ormRepository = getRepository(Carrier);
  }

  public async showCarriers(): Promise<Carrier[]> {
    const carriers = await this.ormRepository.find({ relations: ['vehicles'] });
    return carriers;
  }

  public async create({
    name,
    responsible,
    email,
    adress,
    phone,
  }: ICreatedCarrierDTO): Promise<Carrier> {
    const data = {
      name,
      responsible,
      email,
      adress,
      phone,
    };

    const carrier = await this.ormRepository.findOne({
      where: { name },
    });

    if (!carrier) {
      const createCarrier = this.ormRepository.create(data);

      await this.ormRepository.save(createCarrier);
      return createCarrier;
    }

    carrier.responsible = responsible;
    carrier.email = email;
    carrier.adress = adress;
    carrier.phone = phone;

    await this.ormRepository.save(carrier);

    return carrier;
  }
}
