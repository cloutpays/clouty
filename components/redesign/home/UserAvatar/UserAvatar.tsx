import React from 'react';
import * as El from './styles';
import { AvatarFrame } from './styles';

interface IProps {
  base64?: string;
  onClick?: () => void;
}

const UserAvatar: React.FC<IProps> = (props: IProps) => (
  <El.OuterContainer>
    {props.base64 ? (
      <El.Avatar style={{ backgroundImage: `url('${props.base64}')` }} />
    ) : (
      <El.Empty />
    )}
    <AvatarFrame
      src='/static/img/redesign/avatarFrame.png'
      onClick={props.onClick}
    />
  </El.OuterContainer>
);

export default UserAvatar;
