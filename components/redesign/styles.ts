import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
        background: #1b1a1a;
    };
    @font-face {
        font-family: "Wonder Unit Sans";
        src: url('/static/fonts/wonder-unit-sans/webfont/WonderUnitSans-Regular.woff2');
    };
    @font-face {
        font-family: "Wonder Unit Sans";
        font-weight: 300;
        src: url('/static/fonts/wonder-unit-sans/webfont/WonderUnitSans-Light.woff2');
    };
    @font-face {
        font-family: "Wonder Unit Sans";
        font-weight: bold;
        src: url('/static/fonts/wonder-unit-sans/webfont/WonderUnitSans-Bold.woff2');
    };
`;

export const OuterContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #1b1a1a;
  align-items: center;
  color: white;
  @media (max-width: 768px) {
    padding-left: 7px;
    padding-right: 7px;
  }
`;

export const InnerContainer = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 1170px;
  width: 100%;
  margin-top: 24px;
  @media (max-width: 768px) {
    padding-left: 7px;
    padding-right: 7px;
  }
`;

export const Header = styled.header`
  font-family: 'Wonder Unit Sans';
  margin-left: 7px;
  margin-right: 7px;
  margin-top: 27px;
  max-width: 1170px;
  width: 100%;
  @media (max-width: 768px) {
    margin-top: 7px;
    padding-bottom: 50px;
  }
  background: linear-gradient(
      279.54deg,
      rgba(255, 255, 255, 0.2) -2.21%,
      rgba(255, 255, 255, 0) 85.18%
    ),
    #633dae;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  box-shadow: 0px 4px 250px 0px rgba(126, 94, 188, 0.9);
`;

export const DesktopNavigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ButtonBar = styled.nav`
  display: flex;
  flex-direction: row;
  margin-right: 50px;
  align-items: center;
`;

interface ButtonProps extends React.HTMLProps<HTMLAnchorElement> {
  active?: boolean;
}

export const Button = styled.a<ButtonProps>`
  opacity: ${(props) => (props.active ? '100%' : '65%')};
  font-weight: 700;
  padding-left: 20px;
  padding-right: 20px;
  color: white;
  text-decoration: none;
  letter-spacing: 0.01em;
  &:hover {
    text-decoration: none;
    opacity: 100%;
    color: white;
  }
`;

export const Logo = styled.img.attrs(() => ({
  src: '/static/img/redesign/logo.svg',
}))`
  border-top-left-radius: 8px;
  border-bottom-right-radius: 16px;
  padding-top: 15px;
  padding-left: 45px;
  padding-right: 51px;
  padding-bottom: 18px;
  background: rgba(255, 255, 255, 0.11);
`;

export const HeaderText = styled.h1`
  text-align: center;
  font-weight: 300;
  font-size: 20px;
  margin-top: 32px;
  margin-bottom: 46px;
  strong {
    font-weight: bold;
  }
`;
