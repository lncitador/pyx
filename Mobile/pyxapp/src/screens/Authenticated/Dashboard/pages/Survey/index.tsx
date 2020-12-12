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

import {
  InputForm,
  Button,
  Popups,
  RectButtonForm,
} from '../../../../../components';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../../../../hooks/api';

interface PlateInFormData {
  plate: string;
}

interface CarrierInFormData {
  cnpj: string;
}

interface VehicleInFormData {
  plate: string;
  driver: string;
  carrier_id: string;
}

const Survey: React.FC = () => {
  const navigate = useNavigation();

  const {
    findPlate,
    saveVehicle,
    createCarrier,
    findCarrier,
    vehicle,
    survey,
    changeSurvey,
  } = useApi();

  const formSearchRef = useRef<FormHandles>(null);
  const formSearchedRef = useRef<FormHandles>(null);
  const formNewVehicleRef = useRef<FormHandles>(null);
  const formSearchCarrierRef = useRef<FormHandles>(null);

  const [messageError, setMessageError] = useState('');
  const [searchFounded, setSearchFounded] = useState(false);
  const [searched, setSearched] = useState(false);
  const [plate, setPlate] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [loadCarrier, setLoadCarrier] = useState(false);

  console.log(cnpj);

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

  const handleSearchCarrierSubmit = useCallback(
    async (data: CarrierInFormData) => {
      try {
        setMessageError('');
        formSearchRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cnpj: Yup.string()
            .min(14, 'o CNPJ tem que ter no minimo 14 caracteres')
            .required('Digite um CNPJ válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        vehicle.driver = formNewVehicleRef.current?.getFieldValue('driver');
        vehicle.plate = plate;
        vehicle.carrier = await findCarrier(data.cnpj);

        setSearchFounded(false);
        setLoadCarrier(true);

        const responseCarrier = await createCarrier(vehicle.carrier);

        if (!responseCarrier.id) {
          return;
        }

        console.log(responseCarrier.id);

        formNewVehicleRef.current?.setFieldValue(
          'carrier_id',
          responseCarrier.id,
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formSearchRef.current?.setErrors(errors);
          setSearched(false);
          setCnpj('');

          setMessageError(
            err.errors.length === 2 ? err.errors[1] : err.message,
          );
        } else {
          setSearched(true);
        }

        if (data.cnpj.length === 14) {
          setCnpj(data.cnpj);
        }

        setMessageError('');
        setSearchFounded(false);
      }
    },
    [
      createCarrier,
      findCarrier,
      plate,
      vehicle.carrier,
      vehicle.driver,
      vehicle.plate,
    ],
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

        const vehicleSaved = await saveVehicle({
          carrier_id,
          plate,
          driver,
        });

        if (vehicleSaved) {
          await findPlate(vehicleSaved.plate);
          navigate.navigate('Survey');
          changeSurvey();
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formNewVehicleRef.current?.setErrors(errors);
        }
      }
    },
    [changeSurvey, findPlate, navigate, plate, saveVehicle],
  );

  const handleSurveyStack = useCallback(() => {
    navigate.navigate('Survey');
    changeSurvey();
  }, [changeSurvey, navigate]);

  useEffect(() => {
    if (survey) {
      setSearchFounded(false);
      setSearched(false);
    }
  }, [survey]);

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
            {searchFounded && !survey ? (
              <Form
                ref={formSearchedRef}
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
                    formSearchedRef.current?.submitForm();
                  }}>
                  Fazer Vistoria
                </Button>
              </Form>
            ) : (
              <></>
            )}
            {searched && !searchFounded && !survey ? (
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
                    <Form
                      ref={formSearchCarrierRef}
                      onSubmit={handleSearchCarrierSubmit}>
                      <CarrierSearchContainer>
                        <InputForm
                          maxLength={14}
                          keyboardType="number-pad"
                          label="CNPJ"
                          name="cnpj"
                          width={81}
                        />
                        <RectButtonForm
                          icon={'search'}
                          onPress={() => {
                            formSearchCarrierRef.current?.submitForm();
                          }}
                        />
                      </CarrierSearchContainer>
                    </Form>
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
