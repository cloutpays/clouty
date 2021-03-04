import styled from 'styled-components';

export const OuterContainer = styled.a`
  background: #7b5bbb;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  height: 60px;
  bottom: -30px;
  border-radius: 50px;
  padding-left: 37px;
  padding-right: 37px;
  @media (max-width: 768px) {
    position: fixed;
    bottom: 40px;
  }
`;

export const CircularOuterContainer = styled(OuterContainer)`
  width: 92px;
  height: 92px;
  bottom: -46px;
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;
  @media (max-width: 768px) {
    position: fixed;
    bottom: 60px;
  }
`;

export const Text = styled.span`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.01em;
  text-align: center;
  flex: 1;
  font-family: 'Wonder Unit Sans';
  white-space: nowrap;
`;

export const Icon = styled.img`
  height: 9px;
  flex: 0;
`;

export const Separator = styled.div`
  width: 25px;
`;
