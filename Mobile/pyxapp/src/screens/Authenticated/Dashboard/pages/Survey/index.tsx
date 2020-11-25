/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  View,
  Text,
} from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container, PlateContainer, PlateSearchContainer } from './styles';

import getValidationErrors from '../../../../../utils/getValidationError';

import InputForm from '../../../../../components/InputForm';
import Button from '../../../../../components/Button';
import RectButtonForm from '../../../../../components/RectButtonForm';
import { useAuth } from '../../../../../hooks/auth';

interface PlateInFormData {
  plate: string;
}

const Survey: React.FC = () => {
  const { findPlate, vehicle } = useAuth();
  const driverInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const formContinueRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: PlateInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          plate: Yup.string().min(7).required('Digite uma placa valida'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        findPlate(data.plate);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Erro na busca',
          'Ocorreu um erro na buscar, check se a placa estar digitado corretamente',
        );
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
            <Form ref={formRef} onSubmit={handleSubmit}>
              <PlateSearchContainer>
                <InputForm
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
            </Form>
            {vehicle ? (
              <Form ref={formContinueRef} onSubmit={() => {}}>
                <PlateContainer>
                  <InputForm
                    autoCorrect={false}
                    autoCapitalize="none"
                    width={70}
                    name="driver"
                    label="Nome do Motorista"
                    placeholder={vehicle.driver}
                  />
                  <InputForm
                    autoCorrect={false}
                    autoCapitalize="none"
                    width={25}
                    name="plate2"
                    label="Placa"
                    placeholder={vehicle.plate}
                  />
                </PlateContainer>
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
