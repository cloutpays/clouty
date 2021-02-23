import styled from 'styled-components';

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 111px;
  width: 360px;
  position: relative;
  align-items: stretch;
  border-radius: 9px;
  background: linear-gradient(
      284.11deg,
      rgba(239, 158, 158, 0.2) 4.67%,
      rgba(0, 0, 0, 0) 57.08%
    ),
    #242424;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  background: #1b1a1a;
  border-radius: 9px;
  box-shadow: 0px 0px 168px rgba(255, 255, 255, 0.17);
`;

export const RightContainer = styled(LeftContainer)`
  background: transparent;
  & > span {
    padding-left: 24px;
  }
`;

const Label = styled.span`
  font-family: 'Wonder Unit Sans';
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: -2px;
`;

export const Value = styled.span`
  font-family: 'Wonder Unit Sans';
  margin-top: -2px;
  font-weight: 300;
  font-size: 29px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
`;

export const Balance = styled(Label)`
  color: rgba(206, 249, 242, 1);
`;

export const Credit = styled(Label)`
  color: rgba(255, 79, 121, 1);
`;

export const AddButton = styled.a`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #7b5bbb;
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: 20px;
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: none;
    color: white;
  }
`;
