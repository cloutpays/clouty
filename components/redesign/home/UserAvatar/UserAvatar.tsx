import React from 'react';
import * as El from './styles';
import { AvatarFrame } from './styles';

interface IProps {
  // TODO: Make this required
  uri?: string;
}

const UserAvatar: React.FC<IProps> = (props: IProps) => (
  <El.OuterContainer>
    <AvatarFrame src='/static/img/redesign/avatarFrame.png' />
  </El.OuterContainer>
);

export default UserAvatar;
