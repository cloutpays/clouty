import styled from 'styled-components';

export const OuterContainer = styled.div`
  @media (max-width: 768px) {
    height: 70px;
  }
`;

export const AvatarFrame = styled.img`
  width: 177px;
  height: 133px;
  transform: translate(0, -12px);
  @media (max-width: 768px) {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -75%);
  }
`;
