/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import Employeer from '../models/Employeer';
import EmployeersRepository from '../repositories/EmployeersRepository';
import CreateEmployeerService from '../services/CreateEmployeerService';

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

    try {
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
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
