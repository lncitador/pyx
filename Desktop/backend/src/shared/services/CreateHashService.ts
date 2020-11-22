import { hash } from 'bcryptjs';

interface IRequest {
  password: string;
}

class CreateHashService {
  public async execute({ password }: IRequest): Promise<string> {
    const hashedPassword = await hash(password, 8);

    return hashedPassword;
  }
}

export default CreateHashService;
