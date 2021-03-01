import styled from 'styled-components';

export const OuterContainer = styled.div`
  position: relative;
  @media (max-width: 768px) {
    height: 70px;
  }
`;

export const AvatarFrame = styled.img`
  width: 177px;
  height: 133px;
  transform: translate(0, -12px);
  cursor: pointer;
  @media (max-width: 768px) {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -75%);
  }
`;

export const Avatar = styled.div`
  width: 104px;
  height: 104px;
  position: absolute;
  right: 14px;
  top: -4px;
  border-radius: 52px;
  background-color: black;
  background-position: center;
  background-size: cover;
  @media (max-width: 768px) {
    top: unset;
    right: calc(50% - 75px);
    bottom: 54px;
  }
`;

export const Empty = styled.div`
  width: 104px;
  height: 104px;
  position: absolute;
  right: 14px;
  top: -4px;
  border-radius: 52px;
  @media (max-width: 768px) {
    top: unset;
    right: calc(50% - 75px);
    bottom: 54px;
  }
  background-color: black;
`;
