import { HTMLProps } from 'react';
import styled from 'styled-components';

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-wrap: nowrap;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 238px;
  width: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface BetContainerProps extends HTMLProps<HTMLDivElement> {
  imageUri: string;
}

export const BetContainer = styled.div<BetContainerProps>`
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: flex-end;
  height: 100%;
  width: 218px;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 44.31%,
      rgba(0, 0, 0, 0.9) 100%
    ),
    url(${(props) => props.imageUri});
  background-size: cover;
  border-radius: 8.12759px;
  padding-bottom: 22px;
  padding-left: 22px;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.2s ease;
  margin-right: 11px;
  @media (max-width: 768px) {
    width: 160px;
  }
`;

export const CategoriesBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 218px;
  justify-content: space-around;
  align-items: flex-start;
  border-radius: 7px;
  @media (max-width: 1170px) {
    display: none;
  }
`;

export const CategoriesHeader = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
`;

export const HorizontalCategoriesHeader = styled.span`
  display: none;
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
  @media (max-width: 1170px) {
    display: flex;
  }
  margin-top: 36px;
`;

export const CreateBetBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #0a0a0a;
  padding-left: 32px;
  padding-right: 32px;
  height: 100%;
  width: 218px;
  border-radius: 8.12759px;
  margin-right: 11px;
`;

export const CreateBetHeader = styled.span`
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 0.01em;
  margin-bottom: 9px;
  text-align: center;
`;

export const CreateBetDesc = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.01em;
  text-align: center;
  opacity: 60%;
`;

export const CreateBetButton = styled.span`
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #7b5bbb;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 0.01em;
  margin-top: 20px;
  border-radius: 50px;
  &:hover {
    cursor: pointer;
  }
`;

export const Category = styled.span`
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 14px;
  padding-bottom: 14px;
  font-size: 14px;
  font-weight: bold;
  flex: 0;
  box-shadow: 0px 0px 44px rgba(123, 91, 187, 0.6);
  border-radius: 7px;
`;

export const HorizontalCategoriesBox = styled.div`
  display: none;
  @media (max-width: 1170px) {
    display: flex;
  }
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

export const HorizontalCategory = styled.span`
  flex: 0 0 auto;
  box-shadow: 0px 0px 44px rgba(123, 91, 187, 0.6);
  border-radius: 7px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 14px;
  padding-bottom: 14px;
  margin: 5px;
  font-size: 14px;
  font-weight: bold;
  margin-top: 27px;
  margin-bottom: 27px;
`;
