import styled from 'styled-components';

export const OuterContainer = styled.a`
  padding-top: 19px;
  padding-bottom: 19px;
  padding-left: 35px;
  padding-right: 35px;
  background: #7b5bbb;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  align-items: center;
  cursor: pointer;
`;

export const Text = styled.span`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.01em;
  text-align: center;
  flex: 1;
`;

export const Icon = styled.img`
  height: 15px;
  flex: 0;
  padding-right: 26px;
`;
