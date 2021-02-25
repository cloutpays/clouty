import styled from 'styled-components';

export const UserInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FeaturedBetsBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 42px;
  margin-bottom: 35px;
`;

export const SectionHeaderText = styled.h2`
  font-family: 'Wonder Unit Sans';
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 0.01em;
`;

export const SeeAllButton = styled.span`
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 0.01em;
  color: #8565c5;
  text-decoration: none;
  &:hover {
    color: #8565c5;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const HistorySections = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 42px;
  margin-bottom: 80px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const HistoryBox = styled.div`
  flex: 1;
  &:first-child {
    padding-right: 20px;
  }
`;
