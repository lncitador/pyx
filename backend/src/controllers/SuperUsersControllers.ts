import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import SuperUser from '../models/SuperUser';
import CreateHashService from '../services/CreateHashService';

export default class SuperUserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const superUserRepository = getRepository(SuperUser);

    const createHashService = new CreateHashService();

    const hashedPassword = await createHashService.execute({ password });

    const createSuperUser = await superUserRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await superUserRepository.save(createSuperUser);

    return response.json(createSuperUser);
  }
}
