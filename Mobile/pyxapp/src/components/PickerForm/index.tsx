import React, { useEffect, useRef, useState, useCallback } from 'react';
import RNPickerSelect from 'react-native-picker-select';

import { useField } from '@unform/core';
import { Container, InputView, Label } from './styles';

interface PickerProps {
  onValueChange?: (value: any, index: number) => void;
  name: string;
  label?: string;
  widht?: number;
  items: Array<{
    value: string;
    label: string;
  }>;
}

const PickerSelect: React.FC<PickerProps> = ({
  name,
  label,
  widht,
  items,
  onValueChange,
  ...rest
}) => {
  const pickerRef = useRef(null);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const customOnValueChange = useCallback(
    (value: string, index: number) => {
      setSelectedValue(value);
      onValueChange && onValueChange(value, index);
    },
    [onValueChange],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      getValue: (ref) => {
        return ref.props.value || '';
      },
      clearValue: (ref) => {
        ref.props.onValueChange(ref.props.placeholder.value);
      },
      setValue: (_, value: string) => {
        setSelectedValue(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container width={widht}>
      {label ? <Label>{label}</Label> : <></>}
      <InputView>
        <RNPickerSelect
          ref={pickerRef}
          placeholder={{ label: 'Selecione uma Transportadora' }}
          value={selectedValue}
          onValueChange={customOnValueChange}
          items={items}
          style={{
            placeholder: { color: '#4a6572' },
            inputAndroid: {
              color: '#4a6572',
            },
          }}
          {...rest}
        />
      </InputView>
    </Container>
  );
};

export default PickerSelect;
