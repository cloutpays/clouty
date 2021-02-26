import React, { useState } from 'react';
import * as El from './styles';

interface IProps {
  defaultValue?: string;
  label?: string;
  onChange?: (value: string) => void;
}

const TextInput: React.FC<IProps> = (props: IProps) => {
  const { defaultValue, label } = props;
  const [value, setValue] = useState(defaultValue || '');

  const onChange = (event: any) => {
    setValue(event.target.value);
    props.onChange?.(event.target.value);
  };

  return (
    <El.OuterContainer>
      <El.InputContainer type='text' value={value} onChange={onChange} />
      {label && <El.Label>{label}</El.Label>}
    </El.OuterContainer>
  );
};

export default TextInput;
