import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAdminService from '@modules/admin/services/CreateAdminService';

export default class AdminsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const createAdminService = container.resolve(CreateAdminService);

    const { name, password } = request.body;

    const createAdmin = await createAdminService.execute({
      name,
      password,
    });

    return response.json(createAdmin);
  }
}
