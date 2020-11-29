/* eslint-disable no-shadow */
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, InputView, TextInput, Icon, Label } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
  label?: string;
  width: number;
  disabled?: boolean;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputForm: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, label, width, disabled, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '', error, fieldName } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isfilled, setIsFilled] = useState(false);

  const handlerInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handlerInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container width={width}>
      {label ? <Label>{label}</Label> : <></>}
      <InputView
        isDisabled={disabled ? disabled : (disabled = false)}
        isFocused={isFocused}
        isErrored={!!error}>
        {icon ? (
          <Icon
            name={icon}
            size={20}
            color={isfilled || isFocused ? '#9BB5C0' : '#4A6572'}
          />
        ) : (
          <></>
        )}

        <TextInput
          ref={inputElementRef}
          {...rest}
          keyboardAppearance="dark"
          placeholderTextColor={isfilled || isFocused ? '#9BB5C0' : '#4A6572'}
          defaultValue={defaultValue}
          onFocus={handlerInputFocus}
          onBlur={handlerInputBlur}
          onChangeText={(value) => {
            inputValueRef.current.value = value;
          }}
        />
      </InputView>
    </Container>
  );
};

export default forwardRef(InputForm);
