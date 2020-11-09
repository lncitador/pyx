import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const authenticateUser = new AuthenticateUserService();
    const { email, password } = request.body;

    try {
      const { name, id } = await authenticateUser.execute({
        email,
        password,
      });

      return response.json({
        id,
        name,
        email,
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
