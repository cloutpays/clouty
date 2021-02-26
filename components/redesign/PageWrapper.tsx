import Link from 'next/link';
import Router from 'next/router';
// @ts-ignore
import NProgress from 'nprogress';
import React from 'react';
import * as El from './styles';

interface IProps {
  header?: string;
  active?: string;
  showUserGreeting?: boolean;
  goBack?: () => void;
  children?: React.ReactNode;
  pageMode?: 'standard' | 'modal';
}

// TODO: After merging redesign into main paths, change those values accordingly
const links: { name: string; path: string }[] = [
  { name: 'Home', path: '/redesign/home' },
  { name: 'Account Settings', path: '/redesign/account-settings' },
  { name: 'Payouts', path: '/payouts' },
  { name: 'Add to Balance', path: '/user/balance' },
  { name: 'Our Active Bets', path: '/redesign/games' },
  { name: 'Create Your Bet', path: '/games/create' },
];

// TODO: Figure out proper typings for those, as TS doesn't seem to like them
// @ts-ignore
Router.onRouteChangeStart = () => {
  NProgress.start();
};

// @ts-ignore
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

// @ts-ignore
Router.onRouteChangeError = () => {
  NProgress.done();
};

const PageWrapper: React.FC<IProps> = (props: IProps) => {
  const generateButtons = () =>
    links.map((link) => (
      <Link href={link.path} key={link.path} passHref={true}>
        <El.Button active={link.name === props.active}>{link.name}</El.Button>
      </Link>
    ));

  const generateContent = () => {
    switch (props.pageMode) {
      case 'modal':
        return <El.ModalContainer>{props.children}</El.ModalContainer>;
      default:
        return <El.InnerContainer>{props.children}</El.InnerContainer>;
    }
  };

  return (
    <El.OuterContainer>
      <El.GlobalStyle />
      <El.Header extended={props.pageMode === 'modal'}>
        <El.DesktopNavigation>
          <El.Logo />
          <El.ButtonBar>{generateButtons()}</El.ButtonBar>
        </El.DesktopNavigation>
        <El.HeaderText>
          {props.showUserGreeting ? (
            <>
              {'Hello, '}
              <strong>Jason Todd!</strong>
            </>
          ) : (
            <strong>{props.header}</strong>
          )}
        </El.HeaderText>
      </El.Header>
      {generateContent()}
    </El.OuterContainer>
  );
};

export default PageWrapper;
