import styled from 'styled-components';

export const HorizontalScrollable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

export const Error = styled.span`
  text-align: center;
  font-family: 'Wonder Unit Sans';
  position: absolute;
  font-size: 12px;
  bottom: 80px;
  left: 0;
  right: 0;
  @media (max-width: 768px) {
    bottom: 0;
  }
`;

export const Option = styled.span`
  font-family: 'Wonder Unit Sans';
  font-size: 15px;
  padding: 15px;
  background-color: #1b1a1a;
  box-shadow: 0px 0px 44px rgba(88, 88, 88, 0.6);
  border-radius: 7px;
  margin-right: 14px;
  &:last-child {
    margin-right: 0;
  }
  font-weight: bold;
  cursor: pointer;
`;

export const SelectedOption = styled(Option)`
  background-color: #7b5bbb;
  box-shadow: none;
`;

export const Header = styled.h2`
  text-align: center;
  font-family: 'Wonder Unit Sans';
  font-weight: 300;
  letter-spacing: 0.01em;
  font-size: 35px;
  margin-bottom: 16px;
`;

export const Info = styled.span`
  text-align: center;
  font-family: 'Wonder Unit Sans';
  font-weight: 500;
  letter-spacing: 0.01em;
  font-size: 18px;
  margin-top: 24px;
`;

export const InfoSmall = styled(Info)`
  font-size: 15px;
  margin-top: 8px;
`;

export const InnerOver = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const InnerSeparator = styled.div`
  height: 80px;
`;

export const UpperOverlay = styled.img`
  position: fixed;
  width: 100vw;
  left: 0;
  top: 0;
`;
