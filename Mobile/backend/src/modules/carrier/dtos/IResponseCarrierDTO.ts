import IAddress from './IAddressDTO';

export default interface IResponseCarrierDTO {
  name?: string;
  cnpj: string;
  responsible?: string;
  email?: string;
  address?: IAddress;
  phone?: string;
}
