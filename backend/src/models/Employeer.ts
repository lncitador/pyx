import { v4 } from 'uuid';

class Employeer {
  id: string;

  fullName: string;

  cpf: number;

  adress: string;

  number: number;

  city: string;

  borne: string;

  subsidiary: string;

  constructor({
    fullName,
    cpf,
    adress,
    number,
    city,
    borne,
    subsidiary,
  }: Omit<Employeer, 'id'>) {
    this.id = v4();
    this.fullName = fullName;
    this.cpf = cpf;
    this.adress = adress;
    this.number = number;
    this.city = city;
    this.borne = borne;
    this.subsidiary = subsidiary;
  }
}

export default Employeer;
