/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';

import Employeer from '../models/Employeer';
import EmployeersRepository from '../repositories/EmployeersRepository';
import CreateEmployeerService from '../services/CreateEmployeerService';

const employeersRepository = new EmployeersRepository();
const createEmployeerService = new CreateEmployeerService(employeersRepository);

export default class EmployeersControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const listEmployeers = employeersRepository.all();

    return response.json(listEmployeers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
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
      const createEmployeer = createEmployeerService.execute({
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
