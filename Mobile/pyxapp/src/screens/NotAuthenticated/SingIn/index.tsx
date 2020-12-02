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
} from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container, ForgotPassword, ForgotPasswordtext } from './styles';

import getValidationErrors from '../../../utils/getValidationError';

import { useAuth } from '../../../hooks/auth';

import imgPng from '../../../assets/logo.png';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

interface SingInFormData {
  registry: string;
  cpf: string;
}

const SingIn: React.FC = () => {
  const { singIn, user } = useAuth();

  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);

  const handleSingIn = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          registry: Yup.string().required('Matricula obrigatório'),
          cpf: Yup.string().required('Senha Obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await singIn({ registry: data.registry, cpf: data.cpf });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, check as credencias',
        );
      }
    },
    [singIn],
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
            <Image style={{ marginBottom: 50 }} source={imgPng} />
            <Form ref={formRef} onSubmit={handleSingIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                name="registry"
                label="Digite o ID e senha pra entrar"
                icon="user"
                placeholder="ID ou Matricula"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="cpf"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Entrar
              </Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordtext>Esqueci minha senha</ForgotPasswordtext>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SingIn;
