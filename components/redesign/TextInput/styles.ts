import styled from 'styled-components';

export const OuterContainer = styled.div`
  width: 100%;
  height: 80px;
  position: relative;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 20px;
`;

export const InputContainer = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.12);
  background: transparent;
  color: white;
  padding-left: 50px;
  padding-right: 50px;
  font-size: 18px;
`;

export const Label = styled.span`
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.01em;
  background-color: #242323;
  @media (max-width: 768px) {
    background-color: #1b1a1a;
  }
  padding-left: 15px;
  padding-right: 50px;
  position: absolute;
  left: 35px;
  top: 0;
`;
