import styled from 'styled-components';

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 42px;
  padding-bottom: 42px;
  padding-left: 48px;
  padding-right: 48px;
  background-color: #242323;
  border-radius: 7px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 42px;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  margin-bottom: 32px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
`;

export const Title = styled.span`
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
  letter-spacing: 0.01em;
`;

export const SeeMoreButton = styled.img`
  width: 26px;
  height: 9px;
`;

export const DataBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DatumBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
`;

export const DatumIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 21px;
`;

export const DatumIndicatorPoint = styled.div`
  width: 7px;
  height: 7px;
  background: white;
  opacity: 20%;
  border-radius: 50%;
  margin-bottom: 8px;
`;

export const DatumIndicatorLine = styled.div`
  width: 1px;
  height: 90px;
  background: white;
  opacity: 20%;
  margin-bottom: 8px;
`;

export const DatumInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 21px;
`;

export const DatumName = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.16em;
  color: #7b5bbb;
`;

export const DatumDesc = styled.span`
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.01em;
  width: 70%;
`;

export const DatumAdditional = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  flex: 1;
`;

export const DatumCredits = styled.span`
  background: #2f2e2e;
  border-radius: 40px;
  font-weight: 500;
  text-align: center;
  font-size: 15px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 14px;
  padding-right: 14px;
`;

export const DatumDate = styled.span`
  text-align: right;
  font-size: 12px;
  letter-spacing: 0.01em;
  font-weight: 500;
  margin-top: 7px;
`;

export const GameBet = styled.span`
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.01em;
  opacity: 50%;
`;

export const GamePreview = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 7px;
`;
