import React, { useState } from 'react';
import * as El from './styles';

interface IProps {
  defaultValue?: string;
  label?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  style?: any;
}

const TextInput: React.FC<IProps> = (props: IProps) => {
  const { defaultValue, label, disabled, style } = props;
  const [value, setValue] = useState(defaultValue || '');

  const onChange = (event: any) => {
    setValue(event.target.value);
    props.onChange?.(event.target.value);
  };

  return (
    <El.OuterContainer>
      <El.InputContainer
        type='text'
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={style}
      />
      {label && <El.Label>{label}</El.Label>}
    </El.OuterContainer>
  );
};

export default TextInput;
