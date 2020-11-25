import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import {
  mobile,
  pyxapi,
  VehicleResponseData,
  CarrierResponseData,
} from '../services/UseApi';

interface SingInCredentials {
  registry: string;
  cpf: string;
}
interface AuthContextData {
  user: object;
  vehicle: VehicleResponseData;
  loading: boolean;
  singIn(credentials: SingInCredentials): Promise<void>;
  singOut(): void;
  findPlate(plate: string): Promise<void>;
}

interface AuthState {
  token: string;
  user: object;
}

interface SurveyState {
  plate: string;
  driver: string;
  carrier: CarrierResponseData;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthUser: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [survey, setSurvey] = useState<SurveyState>({} as SurveyState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@PyxApp:token',
        '@PyxApp:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const singIn = useCallback(async ({ registry, cpf }) => {
    const response = await pyxapi.post('mobile', {
      registry,
      cpf,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@PyxApp:token', token],
      ['@PyxApp:user', JSON.stringify(user)],
    ]);

    pyxapi.defaults.headers.authorization = `Bearer ${token[1]}`;

    setData({ token, user });
  }, []);

  const findPlate = useCallback(async (plate) => {
    const vehicle = await mobile.get<VehicleResponseData>(`vehicle/${plate}`);

    const { driver, carrier } = vehicle.data;

    await AsyncStorage.multiSet([
      ['@PyxApp:plate', plate],
      ['@PyxApp:driver', driver],
      ['@PyxApp:carrier', JSON.stringify(carrier)],
    ]);

    setSurvey({ plate, driver, carrier });
    // const [getPlate, getDriver, getCarrier] = await AsyncStorage.multiGet([
    //   '@PyxApp:plate',
    //   '@PyxApp:driver',
    //   '@PyxApp:carrier',
    // ]);
    console.log(carrier);
  }, []);

  const singOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@PyxApp:token', '@PyxApp:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        vehicle: survey,
        loading,
        singIn,
        singOut,
        findPlate,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an Authuser');
  }

  return context;
}

export default AuthContext;
