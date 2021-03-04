import React from 'react';
import { PaymentMethod } from '../../../../constants/types';
import * as El from './styles';

interface IProps extends React.HTMLProps<HTMLElement> {
  chosen?: PaymentMethod;
  onChoose: (choice: PaymentMethod) => void;
}

const PaymentMethodList: React.FC<IProps> = (props: IProps) => {
  const onChoose = (choice: PaymentMethod) => () => props.onChoose(choice);

  const createButton = (option: PaymentMethod) => (
    <El.Option onClick={onChoose(option)}>
      <El.Icon icon={option} />
      {props.chosen === option && (
        <El.Checkmark src='/static/img/redesign/purpleCheckmark.svg' />
      )}
    </El.Option>
  );

  return (
    <El.OuterContainer style={props.style}>
      {Object.values(PaymentMethod).map((method) => createButton(method))}
    </El.OuterContainer>
  );
};

export default PaymentMethodList;
