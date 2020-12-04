/* eslint-disable no-plusplus */
import ICreatedCarrierDTO from '@modules/carrier/dtos/ICreateCarrierDTO';
import ICarrierRepository from '@modules/carrier/repositories/ICarrierRepository';
import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import Carrier from '../entities/Carrier';

export default class CarrierRepository implements ICarrierRepository {
  private ormRepository: Repository<Carrier>;

  constructor() {
    this.ormRepository = getRepository(Carrier);
  }

  public async IndexCarrier(id: string): Promise<Carrier | undefined> {
    const carrier = await this.ormRepository.findOne({ where: { id } });

    if (carrier) {
      if (carrier.address) {
        carrier.address = JSON.parse(carrier.address);
      }
    } else {
      throw new AppError('Carrier not exist');
    }

    return carrier;
  }

  public async showCarriers(): Promise<Carrier[]> {
    const carriers = await this.ormRepository.find({ relations: ['vehicles'] });

    const carriersParsed: Carrier[] = [];

    for (let i = 0; i < carriers.length; i++) {
      const carrier = carriers[i];
      carrier.address = carrier.address
        ? JSON.parse(carrier.address)
        : carrier.address;

      carriersParsed.push(carrier);
    }
    return carriersParsed;
  }

  public async create({
    name,
    cnpj,
    responsible,
    email,
    address,
    phone,
  }: ICreatedCarrierDTO): Promise<Carrier> {
    const data = {
      name,
      cnpj,
      responsible,
      email,
      address,
      phone,
    };

    const carrier = await this.ormRepository.findOne({
      where: { cnpj },
    });

    if (!carrier) {
      const createCarrier = this.ormRepository.create(data);
      createCarrier.address = address ? JSON.parse(address) : address;

      await this.ormRepository.save(createCarrier);

      return createCarrier;
    }

    carrier.responsible = responsible;
    carrier.email = email;
    carrier.phone = phone;
    carrier.address = address;
    carrier.address = address ? JSON.parse(address) : address;

    await this.ormRepository.save(carrier);

    return carrier;
  }
}
