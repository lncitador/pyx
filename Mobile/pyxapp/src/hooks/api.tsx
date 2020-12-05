import React, { createContext, useCallback, useContext, useState } from 'react';
import {
  CarrierResponseData,
  mobile,
  VehicleData,
  VehicleResponseData,
} from '../services/UseApi';

interface ApiContextData {
  vehicle: VehicleData;
  survey: boolean;
  changeSurvey(): void;
  findPlate(plate: string): Promise<void>;
  saveVehicle(data: VehicleSaveData): Promise<VehicleResponseData>;
  getCarrier(id: string): Promise<CarrierResponseData>;
}

interface VehicleSaveData {
  plate: string;
  driver: string;
  carrier_id: string;
}

export interface SurveyState {
  plate: string;
  driver: string;
  carrier: CarrierResponseData;
}

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const Api: React.FC = ({ children }) => {
  const [vehicle, setVehicle] = useState<SurveyState>({} as SurveyState);
  const [survey, setSurvey] = useState(false);

  const findPlate = useCallback(async (plate: string) => {
    const getVehicle = await mobile.get<VehicleData>(`vehicle/${plate}`);
    const { driver, carrier } = getVehicle.data;

    if (carrier) {
      carrier.phone = String(carrier.phone);
      carrier.address?.num
        ? (carrier.address.num = String(carrier.address.num))
        : carrier.address?.num;
    }
    setVehicle({ plate, driver, carrier });
  }, []);

  const saveVehicle = useCallback(
    async ({ plate, carrier_id, driver }: VehicleSaveData) => {
      const savedVehicle = await mobile.post<VehicleResponseData>('vehicle', {
        plate,
        driver,
        carrier_id,
      });

      return savedVehicle.data;
    },
    [],
  );

  const getCarrier = useCallback(
    async (id: string) => {
      const { data } = await mobile.get<CarrierResponseData>(`carrier/${id}`);

      data.phone = String(data.phone);
      data.address?.num
        ? (data.address.num = String(data.address.num))
        : data.address?.num;

      setVehicle({
        carrier: data,
        driver: vehicle.driver,
        plate: vehicle.plate,
      });
      return data;
    },
    [vehicle.driver, vehicle.plate],
  );

  const changeSurvey = useCallback(() => {
    setSurvey(!survey);
    if (survey) {
      setVehicle({} as SurveyState);
    }
  }, [survey]);

  return (
    <ApiContext.Provider
      value={{
        vehicle,
        survey,
        changeSurvey,
        findPlate,
        saveVehicle,
        getCarrier,
      }}>
      {children}
    </ApiContext.Provider>
  );
};

export function useApi(): ApiContextData {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('useApi must be used');
  }

  return context;
}
