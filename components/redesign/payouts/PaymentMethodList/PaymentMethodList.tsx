import React from 'react';
import * as El from './styles';

interface IProps extends React.HTMLProps<HTMLElement> {
  iconUri?: string;
}

const Button: React.FC<IProps> = (props: IProps) => (
  <El.OuterContainer style={props.style}>
    {props.iconUri && <El.Icon src={props.iconUri} />}
    {props.children && <El.Text>{props.children}</El.Text>}
  </El.OuterContainer>
);

export default Button;
