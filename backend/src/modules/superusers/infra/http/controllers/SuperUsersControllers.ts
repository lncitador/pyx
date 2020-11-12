import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSuperUserService from '@modules/superusers/services/CreateSuperUserService';

export default class SuperUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createSuperUserService = container.resolve(CreateSuperUserService);

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
