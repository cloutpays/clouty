import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import Question from './Question';
interface SignUpFormProps {
  game: any;
  user: any;
  previousBet: any;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ game, user }) => {
  const [name] = useState<string>(user ? user.info.firstName : '');
  const [email] = useState<string>(user ? user.firebase.email : '');
  const [handle] = useState<string>(user ? user.info.firstName : '');
  const [answer, setAnswer] = useState<string>('');
  const [options, setOptions] = useState<any>(game.options);
  const [phoneNumber] = useState<string>(user ? user.info.phoneNumber : '');
  const [wager, setWager] = useState<number[]>([1, 5, 10, 20, 50]);
  const [loading, setLoading] = useState<boolean>(false);

  const confirmAnswer = (answer: any) => {
    setOptions([{ value: answer }]);
    setAnswer(answer);
  };
  const resetGame = () => {
    setWager([Number(1), Number(5), Number(10), Number(20), Number(50)]);
    setOptions(game.options);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    if (!loading) {
      setLoading(true);
      const date = new Date();
      const userSubmission = {
        email,
        answer,
        name,
        phoneNumber,
        handle,
        userId: user._id,
        wager: wager[0],
        date,
        question: game.question,
      };
      event.preventDefault();
      await axios({
        method: 'post',
        url: '/api/submission',
        data: { userSubmission, user },
      }).then(() => {
        Router.push(`/confirmation/${wager}`);
      });
    }
  };
  return (
    <div className='row'>
      <div className='form-card'>
        <form onSubmit={handleSubmit}>
          <div className='mt2'>
            <label className='fw6' htmlFor='email'>
              Select your wager:
            </label>
            <br />
            <div className='dib-ns'>
              <div className='flex flex-wrap'>
                {wager.map((wage, ind) => {
                  return (
                    <div
                      onClick={() => setWager([Number(wage)])}
                      key={ind}
                      className='noselect grow outline dim pa2 mr2 mt2'>
                      <strong>${wage}</strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Question
            type={game.type}
            options={options}
            title={game.question}
            setAnswer={confirmAnswer}
          />
          <br />
          {options.length === 1 && wager.length === 1 && (
            <div>
              {wager[0] > user.stripe.user.balance / 100 ? (
                <div className='mb2 f7 fw6 '>
                  You have insufficient credits. Reload your balance.
                </div>
              ) : (
                <div>
                  <span
                    onClick={resetGame}
                    className='bg-white-30 pv1 pl2 pr3 mr2 f7 f6-ns br-pill b noselect'>
                    <span className='pl1 sans-serif'>Reset</span>
                  </span>
                  <span
                    onClick={handleSubmit}
                    className='bg-white-30 pv1 pl2 pr3 f7 f6-ns br-pill b noselect'>
                    <span className='pl1 sans-serif'>Play</span>
                  </span>
                </div>
              )}
            </div>
          )}
          {options.length + wager.length > 2 && (
            <div>
              <span
                onClick={resetGame}
                className='bg-white-30 pv1 pl2 pr3 f7 f6-ns br-pill b noselect'>
                <span className='pl1 sans-serif'>Reset</span>
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
