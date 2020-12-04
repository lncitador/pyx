import React, { createContext, useCallback, useContext, useState } from 'react';
import {
  CarrierResponseData,
  mobile,
  VehicleData,
  VehicleResponseData,
} from '../services/UseApi';

interface ApiContextData {
  stack: boolean;
  vehicle: VehicleData;
  changeStack(): void;
  findPlate(plate: string): Promise<void>;
  saveVehicle(data: VehicleSaveData): Promise<VehicleResponseData>;
  getCarrier(id: string): Promise<CarrierResponseData>;
}

interface VehicleSaveData {
  plate: string;
  driver: string;
  carrier_id: string;
}

interface SurveyState {
  plate: string;
  driver: string;
  carrier: CarrierResponseData;
}

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const Api: React.FC = ({ children }) => {
  const [survey, setSurvey] = useState<SurveyState>({} as SurveyState);
  const [stack, setStack] = useState(false);

  const findPlate = useCallback(async (plate: string) => {
    const vehicle = await mobile.get<VehicleData>(`vehicle/${plate}`);
    const { driver, carrier } = vehicle.data;

    if (carrier) {
      carrier.phone = String(carrier.phone);
      carrier.address?.num
        ? (carrier.address.num = String(carrier.address.num))
        : carrier.address?.num;
    }
    setSurvey({ plate, driver, carrier });
  }, []);

  const saveVehicle = useCallback(
    async ({ plate, carrier_id, driver }: VehicleSaveData) => {
      const vehicle = await mobile.post<VehicleResponseData>('vehicle', {
        plate,
        driver,
        carrier_id,
      });

      return vehicle.data;
    },
    [],
  );

  const getCarrier = useCallback(async (id: string) => {
    const { data } = await mobile.get<CarrierResponseData>(`carrier/${id}`);

    data.phone = String(data.phone);
    data.address?.num
      ? (data.address.num = String(data.address.num))
      : data.address?.num;

    return data;
  }, []);

  const changeStack = useCallback(() => {
    setStack(!stack);
  }, [stack]);

  return (
    <ApiContext.Provider
      value={{
        stack,
        changeStack,
        vehicle: survey,
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
