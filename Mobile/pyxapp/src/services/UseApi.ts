import axios from 'axios';

interface AddresData {
  uf?: string;
  county?: string;
  neighborhood?: string;
  street?: string;
  num?: string;
  cep?: string;
}
export interface CarrierResponseData {
  id: string;
  name?: string;
  cnpj: string;
  responsible?: string;
  email?: string;
  phone?: string;
  address?: AddresData;
}

export interface VehicleResponseData {
  id?: string;
  plate: string;
  driver: string;
  carrier_id: string;
}
export interface VehicleData {
  plate?: string;
  driver?: string;
  carrier?: CarrierResponseData;
}

export const pyxapi = axios.create({
  baseURL: 'http://3.92.227.172:3434',
});

export const mobile = axios.create({
  baseURL: 'http://3.92.197.58:3435',
});

export const receitaws = axios.create({
  baseURL: 'https://www.receitaws.com.br/v1/cnpj/',
});

export const findCnpj = async (cnpj: string) => {
  const carrier = await receitaws.get(`/${cnpj}`);

  console.log(carrier);
};
