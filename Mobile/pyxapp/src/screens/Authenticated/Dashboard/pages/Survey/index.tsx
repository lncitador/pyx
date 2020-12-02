/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  PointPropType,
} from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
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

interface PlateInFormData {
  plate: string;
}

const Survey: React.FC = () => {
  const carriers = [
    {
      id: '1',
      name: 'retira',
    },
    {
      id: '2',
      name: 'retira',
    },
    {
      id: '3',
      name: 'retira',
    },
  ];

  const { findPlate, vehicle } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const formContinueRef = useRef<FormHandles>(null);

  const [messageError, setMessageError] = useState('');
  const [searchFounded, setSearchFounded] = useState(false);
  const [searched, setSearched] = useState(false);
  const [plate, setPlate] = useState('');

  const onSelectChange = (value: string) => {
    const carrier = carriers.find((e) => e.id === value);
    if (!carrier) {
      formRef.current?.setFieldValue('Transportadora', '');
      return;
    }

    const carrierName = carrier.name;

    formRef.current?.setFieldValue('Transportadora', carrierName);
    console.log(carrier.id);
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

        setMessageError('');
        setSearchFounded(false);
      }
    },
    [findPlate],
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
              <Form ref={formContinueRef} onSubmit={() => {}}>
                <PlateContainer>
                  <InputForm
                    autoCorrect={false}
                    autoCapitalize="none"
                    width={64}
                    name="driver"
                    label="Nome do Motorista"
                    placeholder={vehicle.driver}
                  />
                  <InputForm
                    editable={false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    width={31}
                    name="plate"
                    label="Placa"
                    placeholder={vehicle.plate}
                  />
                </PlateContainer>
                <CarrierContainer>
                  <CarrierContainerG1>
                    <InputForm
                      editable={false}
                      autoCorrect={false}
                      autoCapitalize="none"
                      width={77.5}
                      name="name"
                      label="Nome da Empresa"
                      placeholder={vehicle.carrier.name}
                    />
                    <InputForm
                      editable={false}
                      autoCorrect={false}
                      autoCapitalize="none"
                      width={17.5}
                      name="plate"
                      label="UF"
                      placeholder={vehicle.carrier.address?.uf}
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
                      placeholder={vehicle.carrier.responsible}
                    />
                    <InputForm
                      disabled
                      editable={false}
                      autoCorrect={false}
                      autoCapitalize="none"
                      width={37}
                      name="cnpj"
                      label="CNPJ"
                      placeholder={vehicle.carrier.cnpj}
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
                      placeholder={vehicle.carrier.email}
                    />
                    <InputForm
                      disabled
                      editable={false}
                      autoCorrect={false}
                      autoCapitalize="none"
                      width={41}
                      name="fone"
                      label="Telefone"
                      placeholder={String(vehicle.carrier.phone)}
                    />
                  </CarrierContainerG1>
                  <CarrierContainerG1>
                    <InputForm
                      disabled
                      editable={false}
                      autoCorrect={false}
                      autoCapitalize="none"
                      width={40}
                      name="county"
                      label="Cidade"
                      placeholder={vehicle.carrier.address?.county}
                    />
                    <InputForm
                      disabled
                      editable={false}
                      autoCorrect={false}
                      autoCapitalize="none"
                      width={55}
                      name="neighborhood"
                      label="Bairro"
                      placeholder={vehicle.carrier.address?.neighborhood}
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
                      placeholder={vehicle.carrier.address?.street}
                    />
                    <InputForm
                      disabled
                      editable={false}
                      autoCorrect={false}
                      autoCapitalize="none"
                      width={20}
                      name="number"
                      label="Numero"
                      placeholder={String(vehicle.carrier.address?.number)}
                    />
                  </CarrierContainerG1>
                </CarrierContainer>
                <Button
                  style={{ backgroundColor: '#3D8B5C' }}
                  onPress={() => {
                    console.log('clicado');
                  }}>
                  Fazer Vistoria
                </Button>
              </Form>
            ) : (
              <></>
            )}
            {searched && !searchFounded ? (
              <Form ref={formContinueRef} onSubmit={() => {}}>
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
                    editable={false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    width={31}
                    name="plate"
                    label="Placa"
                    placeholder={plate}
                  />
                </PlateContainer>
                <CarrierContainer>
                  <CarrierSearchContainer>
                    <PickerSelect
                      name="select"
                      label="Transportadora"
                      onValueChange={onSelectChange}
                      items={carriers.map((e) => ({
                        value: e.id,
                        label: e.name,
                      }))}
                    />
                    {/* <InputForm
                      autoCorrect={false}
                      autoCapitalize="none"
                      width={80.5}
                      name="carrier"
                      label="Transportadora"
                    />
                    <RectButtonForm
                      icon={'search'}
                      onPress={() => {
                        formRef.current?.submitForm();
                      }}
                    /> */}
                  </CarrierSearchContainer>
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
