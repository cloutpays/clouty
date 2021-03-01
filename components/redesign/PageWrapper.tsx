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
  userName?: string;
  goBack?: () => void;
  children?: React.ReactNode;
  pageMode?: 'standard' | 'modal' | 'legacy';
  /*
    "standard" is the dashboard-like layout
    "modal" is the one used for all other pages
    "legacy" is a wrapper around pre-redesign pages
      to make them (sort of) fit the new layout
  */
}

// TODO: After merging redesign into main paths, change those values accordingly
const links: { name: string; path: string }[] = [
  { name: 'Home', path: '/redesign/home' },
  { name: 'Payouts', path: '/redesign/payouts/step-one' },
  { name: 'Add to Balance', path: '/redesign/add-to-balance' },
  { name: 'Our Active Bets', path: '/redesign/games' },
  { name: 'Create Your Bet', path: '/games/create' },
  // { name: 'Account Settings', path: '/redesign/account-settings' },
  // Account Settings button uses a different button than the rest, because of that it's handled separately inside the render function
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
      case 'legacy':
        return <El.LegacyContainer>{props.children}</El.LegacyContainer>;
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
          <El.ButtonBar>
            {generateButtons()}
            <Link href='/redesign/account-settings' passHref={true}>
              <El.Button active={props.active === 'Account Settings'}>
                <El.ButtonIcon src='/static/img/redesign/accountSettings.svg' />
              </El.Button>
            </Link>
          </El.ButtonBar>
        </El.DesktopNavigation>
        <El.HeaderText>
          {props.showUserGreeting ? (
            <>
              {'Hello, '}
              <strong>{props.userName || 'user'}!</strong>
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
