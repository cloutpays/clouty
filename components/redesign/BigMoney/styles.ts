import styled from 'styled-components';

export const OuterContainer = styled.span`
  font-size: 70px;
  font-weight: 300;
  letter-spacing: 0.01em;
  text-align: center;
  font-family: 'Wonder Unit Sans';
  & > span:first-child {
    color: #7b5bbb;
  }
`;

export const Editable = styled.input`
  display: inline;
  font-size: 70px;
  font-weight: 300;
  letter-spacing: 0.01em;
  text-align: left;
  font-family: 'Wonder Unit Sans';
  border: none;
  background: transparent;
  color: white;
  padding: 0;
`;
