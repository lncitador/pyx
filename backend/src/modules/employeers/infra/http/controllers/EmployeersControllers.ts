/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import Employeer from '@modules/employeers/infra/typeorm/entities/Employeer';
import EmployeersRepository from '@modules/employeers/infra/typeorm/repositories/EmployeersRepository';
import CreateEmployeerService from '@modules/employeers/services/CreateEmployeerService';

export default class EmployeersControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const employeersRepository = getCustomRepository(EmployeersRepository);
    const listEmployeers = await employeersRepository.find();

    return response.json(listEmployeers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createEmployeerService = new CreateEmployeerService();
    const {
      fullName,
      cpf,
      adress,
      number,
      city,
      borne,
      subsidiary,
    }: Employeer = request.body;

    const createEmployeer = await createEmployeerService.execute({
      fullName,
      cpf,
      adress,
      number,
      city,
      borne,
      subsidiary,
    });

    return response.json(createEmployeer);
  }
}
