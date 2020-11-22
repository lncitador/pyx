import { nanoid } from 'nanoid';

export default class CreateRegistry {
  public async execute(): Promise<string> {
    return nanoid(10);
  }
}
