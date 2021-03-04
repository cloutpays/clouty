import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import Link from 'next/link';
import React, { useState } from 'react';
import BigHeader from '../../components/redesign/BigHeader';
import Button from '../../components/redesign/Button';
import Description from '../../components/redesign/Description';
import ModalBackground from '../../components/redesign/ModalBackground';
import ModalButton from '../../components/redesign/ModalButton';
import PageWrapper from '../../components/redesign/PageWrapper';
import TextInput from '../../components/redesign/TextInput';
import { instance } from '../../lib/helpers';
import { getCookie } from '../../lib/session';

interface IProps {
  user: any;
  bet: any;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { origin } = absoluteUrl(ctx.req);
  const apiURL = `${origin}`;
  const user = getCookie('id_token', ctx.req);

  if (!user) {
    // Redirect logged out users to login page
    ctx.res.setHeader('Location', '/login');
    ctx.res.statusCode = 302;
    ctx.res.end();
  }

  const userRes = await instance.get(`${apiURL}/api/user/${user}`);
  const userObj = userRes.data;

  const betId = ctx.query.id;
  if (!betId) {
    // Redirect logged out users to login page
    ctx.res.setHeader('Location', '/games');
    ctx.res.statusCode = 302;
    ctx.res.end();
  }

  const betRes = await instance.get(`${apiURL}/api/question/${betId}`);

  return { props: { user: userObj, bet: betRes.data[0] } };
};

const BetStepOne: React.FC<IProps> = (props: IProps) => {
  const [value, setValue] = useState({} as any);

  return (
    <PageWrapper active='Our Active Bets' header='Step One' pageMode='modal'>
      <ModalBackground>
        <BigHeader>Place a Bet</BigHeader>
        <Description style={{ fontWeight: 500 }}>
          {props.bet.description || "Bet couldn't be loaded, please try again."}
        </Description>
        {props.bet.description && props.bet.gameType === 'fill-in-blank' && (
          <TextInput
            label='Your Bet'
            onChange={(v) => setValue({ value: v, odds: '' })}
          />
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}>
          {props.bet.description &&
            props.bet.gameType === 'game' &&
            props.bet.options.map((o: any) => (
              <Button
                key={o.value}
                style={{
                  marginTop: '20px',
                  backgroundColor:
                    value.value === o.value && value.odds === o.odds
                      ? undefined
                      : '#6040A0',
                  boxShadow:
                    value.value === o.value && value.odds === o.odds
                      ? '0px 0px 44px rgba(123, 91, 187, 0.6)'
                      : 'none',
                }}
                onClick={() => setValue(o)}>
                {o.value}
                {o.odds ? ` (${o.odds})` : ''}
              </Button>
            ))}
        </div>
        <Link
          href={{
            pathname: '/bet/step-two',
            query: {
              value: value.value,
              odds: value.odds,
              id: props.bet.question,
            },
          }}>
          <ModalButton
            iconUri='/static/img/redesign/rightArrowLong.svg'
            disabled={!value || !value.value}
          />
        </Link>
      </ModalBackground>
    </PageWrapper>
  );
};

export default BetStepOne;
