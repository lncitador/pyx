/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useRef, useState } from 'react';
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

import {
  InputForm,
  Button,
  PickerSelect,
  Popups,
  RectButtonForm,
} from '../../../../../components';
import { useApi } from '../../../../../hooks/api';

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

  const { findPlate, saveVehicle, getCarrier, vehicle, changeStack } = useApi();
  const formSearchRef = useRef<FormHandles>(null);
  const formSeaatchedRef = useRef<FormHandles>(null);
  const formNewVehicleRef = useRef<FormHandles>(null);

  const [messageError, setMessageError] = useState('');
  const [searchFounded, setSearchFounded] = useState(false);
  const [searched, setSearched] = useState(false);
  const [plate, setPlate] = useState('');
  const [loadCarrier, setLoadCarrier] = useState(false);

  const onSelectChange = async (value: string) => {
    const carrier = carriers.find((e) => e.id === value);
    if (!carrier) {
      formSearchRef.current?.setFieldValue('Transportadora', '');
      setLoadCarrier(false);

      return;
    }

    const carrierName = carrier.name;

    formSearchRef.current?.setFieldValue('Transportadora', carrierName);

    await getCarrier(carrier.id);
    setLoadCarrier(true);
  };

  const handleSearchPlateSubmit = useCallback(
    async (data: PlateInFormData) => {
      try {
        setMessageError('');
        formSearchRef.current?.setErrors({});

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
          formSearchRef.current?.setErrors(errors);
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
          vehicle.driver = '';
        }

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

        const { driver, carrier_id } = data;

        const vehicleSaved = await saveVehicle({ carrier_id, plate, driver });

        if (vehicleSaved) {
          await findPlate(vehicleSaved.plate);
          changeStack();
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formNewVehicleRef.current?.setErrors(errors);
        }
      }
    },
    [changeStack, findPlate, plate, saveVehicle],
  );

  const handleSurveyStack = useCallback(() => {
    changeStack();
  }, [changeStack]);

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
            <Form ref={formSearchRef} onSubmit={handleSearchPlateSubmit}>
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
                    formSearchRef.current?.submitForm();
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
                ref={formSeaatchedRef}
                initialData={vehicle}
                onSubmit={handleSurveyStack}>
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
                    formSeaatchedRef.current?.submitForm();
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
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Survey;
