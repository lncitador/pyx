import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateEmployerService from '@modules/employeers/services/AuthenticateEmployeerService';

export default class SessionAppController {
  public async create(request: Request, response: Response): Promise<Response> {
    const authenticateEmployeer = container.resolve(
      AuthenticateEmployerService,
    );
    const { registry, cpf } = request.body;

    const { user, token } = await authenticateEmployeer.execute({
      registry,
      cpf,
    });

    return response.json({
      user,
      token,
    });
  }
}
