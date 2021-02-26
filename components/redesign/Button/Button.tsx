import React from 'react';
import * as El from './styles';

interface IProps extends React.HTMLProps<HTMLElement> {}

const Button: React.FC<IProps> = (props: IProps) => (
  <El.OuterContainer>{props.children}</El.OuterContainer>
);

export default Button;
