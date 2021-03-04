import React from 'react';
import * as El from './styles';

interface IProps {
  bets: { label: string; imageUri: string; id: string }[];
  categories: { label: string; filter: string }[];
  onCreateBet?: () => void;
  onVisitBet?: (id: string) => void;
  onClickCategory?: (filter: string) => void;
}

const FeaturedBets: React.FC<IProps> = (props: IProps) => (
  <El.OuterContainer>
    <El.InnerContainer>
      {props.bets.map((bet) => (
        <El.BetContainer
          key={bet.label}
          imageUri={bet.imageUri}
          onClick={() => props.onVisitBet && props.onVisitBet(bet.id)}>
          {bet.label}
        </El.BetContainer>
      ))}
      <El.CreateBetBox>
        <El.CreateBetHeader>Have a bet in mind?</El.CreateBetHeader>
        <El.CreateBetDesc>
          If your bet idea makes the cut, we'll offer it and reward you with a
          $10 credit towards betting!
        </El.CreateBetDesc>
        <El.CreateBetButton onClick={props.onCreateBet}>
          Create Bet
        </El.CreateBetButton>
      </El.CreateBetBox>
      <El.CategoriesBox>
        <El.CategoriesHeader>Categories</El.CategoriesHeader>
        {props.categories.map((category) => (
          <El.Category
            key={category.label}
            onClick={() =>
              props.onClickCategory && props.onClickCategory(category.filter)
            }>
            {category.label}
          </El.Category>
        ))}
      </El.CategoriesBox>
    </El.InnerContainer>
    <El.HorizontalCategoriesHeader>Categories</El.HorizontalCategoriesHeader>
    <El.HorizontalCategoriesBox>
      {props.categories.map((category) => (
        <El.HorizontalCategory
          key={category.label}
          onClick={() =>
            props.onClickCategory && props.onClickCategory(category.filter)
          }>
          {category.label}
        </El.HorizontalCategory>
      ))}
    </El.HorizontalCategoriesBox>
  </El.OuterContainer>
);

export default FeaturedBets;
