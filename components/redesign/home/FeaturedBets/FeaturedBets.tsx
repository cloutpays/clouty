import React from 'react';
import * as El from './styles';

interface IProps {
  bets: { label: string; imageUri: string }[];
  categories: string[];
  onCreateBet?: () => void;
}

const FeaturedBets: React.FC<IProps> = (props: IProps) => (
  <El.OuterContainer>
    {props.bets.map((bet) => (
      <El.BetContainer key={bet.label} imageUri={bet.imageUri}>
        {bet.label}
      </El.BetContainer>
    ))}
    <El.CreateBetBox>
      <El.CreateBetHeader>Have a bet in mind?</El.CreateBetHeader>
      <El.CreateBetDesc>
        If your bet idea makes the cut, we'll offer it and reward you with a $10
        credit towards betting!
      </El.CreateBetDesc>
      <El.CreateBetButton>Create Bet</El.CreateBetButton>
    </El.CreateBetBox>
    <El.CategoriesBox>
      <El.CategoriesHeader>Categories</El.CategoriesHeader>
      {props.categories.map((category) => (
        <El.Category key={category}>{category}</El.Category>
      ))}
    </El.CategoriesBox>
  </El.OuterContainer>
);

export default FeaturedBets;
