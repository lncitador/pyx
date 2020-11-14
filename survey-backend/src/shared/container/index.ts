import { container } from 'tsyringe';

import CarrierRepository from '@modules/carrier/infra/typeorm/repositories/CarrierRepository';
import ICarrierRepository from '@modules/carrier/repositories/ICarrierRepository';

import IVehicleRepository from '@modules/vehicle/repositories/IVehicleRepository';
import VehicleRepository from '@modules/vehicle/infra/typeorm/repositories/VehicleRepository';

import ISurveyRepository from '@modules/survey/repositories/ISurveyRepository';
import SurveyRepository from '@modules/survey/infra/typeorm/repositories/SurveyRepository';

container.registerSingleton<ICarrierRepository>(
  'CarrierRepository',
  CarrierRepository,
);

container.registerSingleton<IVehicleRepository>(
  'VehicleRepository',
  VehicleRepository,
);

container.registerSingleton<ISurveyRepository>(
  'SurveyRepository',
  SurveyRepository,
);
