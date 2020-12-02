/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';

import {
  Container,
  PlateContainer,
  PlateSearchContainer,
  CarrierContainer,
  CarrierSearchContainer,
  CarrierContainerG1,
} from './styles';

import getValidationErrors from '../../../../../utils/getValidationError';

import InputForm from '../../../../../components/InputForm';
import RectButtonForm from '../../../../../components/RectButtonForm';
import PickerSelect from '../../../../../components/PickerForm';
import { useAuth } from '../../../../../hooks/auth';
import Popups from '../../../../../components/Popup';
import Button from '../../../../../components/Button';
import { VehicleResponseData } from '../../../../../services/UseApi';

interface PlateInFormData {
  plate: string;
}

interface VehicleInFormData {
  plate: string;
  driver: string;
  carrier_id: string;
}

const Survey: React.FC = () => {
  const carriers = [
    {
      id: '1aa57bb2-d2b7-47cc-b707-c326342235f5',
      name: 'retira',
    },
    {
      id: 'c3e856c1-7475-406f-95fa-683a064c1884',
      name: 'retira1',
    },
  ];

  const { findPlate, saveVehicle, getCarrier, vehicle } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const formContinueRef = useRef<FormHandles>(null);
  const formNewVehicleRef = useRef<FormHandles>(null);

  const [messageError, setMessageError] = useState('');
  const [searchFounded, setSearchFounded] = useState(false);
  const [searched, setSearched] = useState(false);
  const [plate, setPlate] = useState('');
  const [loadCarrier, setLoadCarrier] = useState(false);
  const [vehicleSurvey, setVehicleSurvey] = useState<VehicleResponseData>(
    {} as VehicleResponseData,
  );
  const [survey, setSurvey] = useState(false);

  const onSelectChange = async (value: string) => {
    const carrier = carriers.find((e) => e.id === value);
    if (!carrier) {
      formRef.current?.setFieldValue('Transportadora', '');
      setLoadCarrier(false);

      return;
    }

    const carrierName = carrier.name;

    formRef.current?.setFieldValue('Transportadora', carrierName);

    await getCarrier(carrier.id);
    setLoadCarrier(true);
  };

  const handleSearchPlateSubmit = useCallback(
    async (data: PlateInFormData) => {
      try {
        setMessageError('');
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          plate: Yup.string()
            .min(7, 'A Placa tem que ter no minimo 7 caracteres')
            .required('Digite uma placa valida'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await findPlate(data.plate);

        setSearchFounded(true);
      } catch (err) {
        vehicle.plate = plate;
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          setSearched(false);
          setPlate('');

          setMessageError(
            err.errors.length === 2 ? err.errors[1] : err.message,
          );
        } else {
          setSearched(true);
        }

        if (data.plate.length === 7) {
          setPlate(data.plate);
        }

        console.log(vehicle);

        setMessageError('');
        setSearchFounded(false);
      }
    },
    [findPlate, plate, vehicle],
  );

  const handleNewSurveySubmit = useCallback(
    async (data: VehicleInFormData) => {
      console.log(data);
      try {
        setMessageError('');
        formNewVehicleRef.current?.setErrors({});

        const schema = Yup.object().shape({
          driver: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { plate, driver, carrier_id } = data;

        // console.log(data);

        const vehicleSaved = await saveVehicle(plate, driver, carrier_id);

        setVehicleSurvey(vehicleSaved);
        setSurvey(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formNewVehicleRef.current?.setErrors(errors);
        }
      }
    },
    [saveVehicle],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled">
          <Container>
            <Form ref={formRef} onSubmit={handleSearchPlateSubmit}>
              <PlateSearchContainer>
                <InputForm
                  maxLength={7}
                  autoCorrect={false}
                  autoCapitalize="none"
                  width={50}
                  name="plate"
                  label="Placa"
                />
                <RectButtonForm
                  icon={'search'}
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                />
              </PlateSearchContainer>
              {messageError.length > 0 ? (
                <Popups>{messageError}</Popups>
              ) : (
                <></>
              )}
            </Form>
            {searchFounded ? (
              <Form
                ref={formContinueRef}
                initialData={vehicle}
                onSubmit={handleNewSurveySubmit}>
                <PlateContainer>
                  <InputForm
                    autoCorrect={false}
                    autoCapitalize="none"
                    width={64}
                    name="driver"
                    label="Nome do Motorista"
                  />
                  <InputForm
                    value={vehicle.plate}
                    editable={false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    width={31}
                    name="plate"
                    label="Placa"
                  />
                </PlateContainer>
                <CarrierContainer>
                  <Scope path="carrier">
                    <CarrierContainerG1>
                      <InputForm
                        editable={false}
                        autoCorrect={false}
                        autoCapitalize="none"
                        width={77.5}
                        name="name"
                        label="Nome da Empresa"
                      />
                      <InputForm
                        editable={false}
                        autoCorrect={false}
                        autoCapitalize="none"
                        width={17.5}
                        name="address.uf"
                        label="UF"
                      />
                    </CarrierContainerG1>
                    <CarrierContainerG1>
                      <InputForm
                        disabled
                        editable={false}
                        autoCorrect={false}
                        autoCapitalize="none"
                        width={58}
                        name="responsible"
                        label="Titular Pessoa Fisica"
                      />
                      <InputForm
                        disabled
                        editable={false}
                        autoCorrect={false}
                        autoCapitalize="none"
                        width={37}
                        name="cnpj"
                        label="CNPJ"
                      />
                    </CarrierContainerG1>
                    <CarrierContainerG1>
                      <InputForm
                        disabled
                        editable={false}
                        autoCorrect={false}
                        autoCapitalize="none"
                        width={54}
                        name="email"
                        label="E-mail"
                      />
                      <InputForm
                        disabled
                        editable={false}
                        autoCorrect={false}
                        autoCapitalize="none"
                        width={41}
                        name="phone"
                        label="Telefone"
                      />
                    </CarrierContainerG1>
                    <Scope path="address">
                      <CarrierContainerG1>
                        <InputForm
                          disabled
                          editable={false}
                          autoCorrect={false}
                          autoCapitalize="none"
                          width={40}
                          name="county"
                          label="Cidade"
                        />
                        <InputForm
                          disabled
                          editable={false}
                          autoCorrect={false}
                          autoCapitalize="none"
                          width={55}
                          name="neighborhood"
                          label="Bairro"
                        />
                      </CarrierContainerG1>
                      <CarrierContainerG1>
                        <InputForm
                          disabled
                          editable={false}
                          autoCorrect={false}
                          autoCapitalize="none"
                          width={75}
                          name="street"
                          label="Rua"
                        />
                        <InputForm
                          disabled
                          editable={false}
                          autoCorrect={false}
                          autoCapitalize="none"
                          width={20}
                          name="num"
                          label="Numero"
                        />
                      </CarrierContainerG1>
                    </Scope>
                  </Scope>
                </CarrierContainer>
                <Button
                  style={{ backgroundColor: '#3D8B5C' }}
                  onPress={() => {
                    formContinueRef.current?.submitForm();
                  }}>
                  Fazer Vistoria
                </Button>
              </Form>
            ) : (
              <></>
            )}
            {searched && !searchFounded ? (
              <Form
                ref={formNewVehicleRef}
                initialData={vehicle}
                onSubmit={handleNewSurveySubmit}>
                <Popups>
                  Veiculo não Cadastrado, digite os dados abaixo!!!
                </Popups>
                <PlateContainer>
                  <InputForm
                    autoCorrect={false}
                    autoCapitalize="none"
                    width={64}
                    name="driver"
                    label="Nome do Motorista"
                  />
                  <InputForm
                    value={plate}
                    editable={false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    width={31}
                    name="plate"
                    label="Placa"
                  />
                </PlateContainer>
                <CarrierContainer>
                  <CarrierSearchContainer>
                    <PickerSelect
                      name="carrier_id"
                      label="Transportadora"
                      onValueChange={onSelectChange}
                      items={carriers.map((e) => ({
                        value: e.id,
                        label: e.name,
                      }))}
                    />
                  </CarrierSearchContainer>
                  {loadCarrier ? (
                    <CarrierContainer>
                      <Scope path="carrier">
                        <CarrierContainerG1>
                          <InputForm
                            editable={false}
                            autoCorrect={false}
                            autoCapitalize="none"
                            width={77.5}
                            name="name"
                            label="Nome da Empresa"
                          />
                          <InputForm
                            editable={false}
                            autoCorrect={false}
                            autoCapitalize="none"
                            width={17.5}
                            name="address.uf"
                            label="UF"
                          />
                        </CarrierContainerG1>
                        <CarrierContainerG1>
                          <InputForm
                            disabled
                            editable={false}
                            autoCorrect={false}
                            autoCapitalize="none"
                            width={58}
                            name="responsible"
                            label="Titular Pessoa Fisica"
                          />
                          <InputForm
                            disabled
                            editable={false}
                            autoCorrect={false}
                            autoCapitalize="none"
                            width={37}
                            name="cnpj"
                            label="CNPJ"
                          />
                        </CarrierContainerG1>
                        <CarrierContainerG1>
                          <InputForm
                            disabled
                            editable={false}
                            autoCorrect={false}
                            autoCapitalize="none"
                            width={54}
                            name="email"
                            label="E-mail"
                          />
                          <InputForm
                            disabled
                            editable={false}
                            autoCorrect={false}
                            autoCapitalize="none"
                            width={41}
                            name="phone"
                            label="Telefone"
                          />
                        </CarrierContainerG1>
                        <Scope path="address">
                          <CarrierContainerG1>
                            <InputForm
                              disabled
                              editable={false}
                              autoCorrect={false}
                              autoCapitalize="none"
                              width={40}
                              name="county"
                              label="Cidade"
                            />
                            <InputForm
                              disabled
                              editable={false}
                              autoCorrect={false}
                              autoCapitalize="none"
                              width={55}
                              name="neighborhood"
                              label="Bairro"
                            />
                          </CarrierContainerG1>
                          <CarrierContainerG1>
                            <InputForm
                              disabled
                              editable={false}
                              autoCorrect={false}
                              autoCapitalize="none"
                              width={75}
                              name="street"
                              label="Rua"
                            />
                            <InputForm
                              disabled
                              editable={false}
                              autoCorrect={false}
                              autoCapitalize="none"
                              width={20}
                              name="num"
                              label="Numero"
                            />
                          </CarrierContainerG1>
                        </Scope>
                      </Scope>
                      <View style={{ height: 16 }} />
                      <Button
                        style={{ backgroundColor: '#3D8B5C' }}
                        onPress={() => {
                          formNewVehicleRef.current?.submitForm();
                        }}>
                        Fazer Vistoria
                      </Button>
                      <View style={{ height: 32 }} />
                    </CarrierContainer>
                  ) : (
                    <></>
                  )}
                </CarrierContainer>
              </Form>
            ) : (
              <></>
            )}
            {survey ? <></> : <></>}
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Survey;
