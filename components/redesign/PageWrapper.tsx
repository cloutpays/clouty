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
  extended?: boolean;
  goBack?: () => void;
  children?: React.ReactNode;
}

// TODO: After merging redesign into main paths, change those values accordingly
const links: { name: string; path: string }[] = [
  { name: 'Home', path: '/redesign/home' },
  { name: 'Account Settings', path: '/user/info' },
  { name: 'Payouts', path: '/payouts' },
  { name: 'Add to Balance', path: '/user/balance' },
  { name: 'Our Active Bets', path: '/games' },
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

  return (
    <El.OuterContainer>
      <El.GlobalStyle />
      <El.Header>
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
            props.header
          )}
        </El.HeaderText>
      </El.Header>
      <El.InnerContainer>{props.children}</El.InnerContainer>
    </El.OuterContainer>
  );
};

export default PageWrapper;
