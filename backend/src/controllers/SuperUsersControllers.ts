import { Request, Response } from 'express';
import CreateSuperUserService from '../services/CreateSuperUserService';

export default class SuperUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createSuperUserService = new CreateSuperUserService();

    const createSuperUser = await createSuperUserService.execute({
      name,
      email,
      password,
    });

    const user = {
      id: createSuperUser.id,
      name: createSuperUser.name,
      email: createSuperUser.email,
      created_at: createSuperUser.created_at,
      updated_at: createSuperUser.updated_at,
    };

    return response.json(user);
  }
}
