import styled from 'styled-components';

export const OuterContainer = styled.a`
  width: 92px;
  height: 92px;
  background: #7b5bbb;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  bottom: -46px;
`;

export const Text = styled.span`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.01em;
  text-align: center;
  flex: 0;
`;

export const Icon = styled.img`
  height: 9px;
  flex: 0;
`;
