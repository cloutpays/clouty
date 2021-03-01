import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body {
        background: #1b1a1a !important;
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
  background-color: #1b1a1a;
  align-items: center;
  color: white;
  @media (max-width: 768px) {
    padding-left: 7px;
    padding-right: 7px;
    &.scrollblock {
      height: 100%;
      overflow: hidden;
    }
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

export const ModalContainer = styled.main`
  display: flex;
  position: absolute;
  flex-direction: column;
  max-width: 695px;
  width: 100%;
  top: 175px;
  @media (max-width: 768px) {
    position: relative;
    max-width: 1170px;
    width: 100%;
    top: 0;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 36px;
    padding-bottom: 36px;
    margin-bottom: 200px;
  }
`;

export const LegacyContainer = styled.main`
  display: flex;
  position: absolute;
  flex-direction: column;
  max-width: 695px;
  width: 100%;
  top: 175px;
  background: white;
  color: black;
  border-radius: 7px;
  @media (max-width: 768px) {
    position: relative;
    max-width: 1170px;
    width: 100%;
    top: 0;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 36px;
    padding-bottom: 36px;
  }
`;

export const Header = styled.header<
  React.HTMLProps<HTMLElement> & { extended?: boolean }
>`
  font-family: 'Wonder Unit Sans';
  margin-left: 7px;
  margin-right: 7px;
  margin-top: 27px;
  max-width: 1170px;
  width: 100%;
  @media (max-width: 768px) {
    margin-top: 7px;
    padding-bottom: ${(props) => (props.extended ? '0' : '50px')};
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
  height: ${(props) => (props.extended ? '288px' : 'unset')};
  @media (max-width: 768px) {
    height: ${(props) => (props.extended ? '217px' : 'unset')};
  }
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

export const MobileNavigation = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  top: 40px;
  left: 0;
  padding-left: 48px;
  padding-right: 48px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: 420px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`;

export const HamburgerButton = styled.img`
  cursor: pointer;
  height: 20px;
`;

export const ArrowButton = styled.img`
  cursor: pointer;
  height: 9px;
  margin-top: 5px;
`;

export const CogButton = styled.img`
  cursor: pointer;
  height: 23px;
  margin-top: -2px;
`;

export const DummyButton = styled.div``;

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
  cursor: pointer;
  &:hover {
    text-decoration: none;
    opacity: 100%;
    color: white;
  }
`;

export const ButtonIcon = styled.img`
  height: 19px;
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

export const DrawerOverlay = styled.nav`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
  position: fixed;
  left: 0;
  top: 0;
  width: calc(100vw - 60px);
  max-width: 356px;
  height: 100vh;
  background: rgba(128, 97, 189, 0.55);
  backdrop-filter: blur(45px);
  padding-left: 34px;
  padding-top: 80px;
  flex-direction: column;
  transition: 0.7s ease all;
  &.hideme {
    left: calc(-100vw + 60px);
    transition: 0.7s ease all;
  }
`;

export const DrawerHeader = styled.h2`
  font-family: 'Wonder Unit Sans';
  font-style: normal;
  font-weight: 300;
  font-size: 35px;
  line-height: 35px;
  letter-spacing: 0.01em;
  margin-bottom: 56px;
`;

export const CloseDrawer = styled.img`
  width: 30px;
  height: 30px;
  padding-right: 10px;
  padding-bottom: 10px;
  margin-bottom: 24px;
`;

export const DrawerButton = styled.a<ButtonProps>`
  opacity: ${(props) => (props.active ? '100%' : '65%')};
  font-size: 18px;
  font-family: 'Wonder Unit Sans';
  margin-bottom: 46px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  letter-spacing: 0.01em;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    opacity: 100%;
    color: white;
  }
`;

export const DrawerDecoration = styled.div`
  width: 50px;
  height: 1px;
  border-radius: 50px;
  box-sizing: border-box;
  background-color: white;
  margin-bottom: 56px;
`;
