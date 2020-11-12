import { Request, Response } from 'express';

import CreateAdminService from '@modules/admin/services/CreateAdminService';

interface IRequest {
  name: string;
  password: string;
}

export default class AdminsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const createAdminService = new CreateAdminService();

    const { name, password }: IRequest = request.body;

    const createAdmin = await createAdminService.execute({
      name,
      password,
    });

    return response.json(createAdmin);
  }
}
