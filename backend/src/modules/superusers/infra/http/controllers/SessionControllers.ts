import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/superusers/services/AuthenticateUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const authenticateUser = new AuthenticateUserService();
    const { email, password } = request.body;

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({
      user,
      token,
    });
  }
}
