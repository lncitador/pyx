import { hash } from 'bcryptjs';

interface Request {
  password: string;
}

class CreateHashService {
  public async execute({ password }: Request): Promise<string> {
    const hashedPassword = await hash(password, 8);

    return hashedPassword;
  }
}

export default CreateHashService;
