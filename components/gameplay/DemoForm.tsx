import React, { useState } from 'react';
import Question from '../gameplay/Question';
interface DemoFormProps {
  game: any;
  previousBet: any;
}

const DemoForm: React.FC<DemoFormProps> = ({ game }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [playText, setPlayText] = useState<string>('Play');
  const [options, setOptions] = useState<any>(game.options);
  const [wager, setWager] = useState<number[]>([5, 10, 20]);

  const wageSelected = wager.length === 1;
  const readyToPlay = wager.length + options.length === 2;
  const betSelected = options.length === 1;
  const resetRender = betSelected || wageSelected;

  const confirmAnswer = (answer: any) => {
    setOptions([{ value: answer }]);
  };
  const resetGame = () => {
    setWager([Number(5), Number(10), Number(20)]);
    setOptions(game.options);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    if (!loading) {
      setLoading(true);
      setPlayText('Playing...');
      event.preventDefault();
      window.location.href = '/signup';
    }
  };
  return (
    <div className='row'>
      <div className='form-card'>
        <form onSubmit={handleSubmit}>
          <Question
            gameType={game.gameType}
            options={options}
            title={game.question}
            setAnswer={confirmAnswer}
          />
          <div className='pt2 mt2'>
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
                      className='noselect outline dim pa2 mr2 mt2'>
                      <strong>${wage}</strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <br />
          <div>
            {resetRender && (
              <span
                onClick={resetGame}
                className='bg-white-30 pv1 pl2 pr3 f7 f6-ns br-pill b noselect'>
                <span className='pl1 sans-serif'>Reset</span>
              </span>
            )}
            {readyToPlay && wageSelected && (
              <span
                onClick={handleSubmit}
                className='bg-white-30 pv1 pl2 pr3 ml2 f7 f6-ns br-pill b noselect'>
                <span className='pl1 sans-serif'>
                  {loading && <i className='fa fa-spinner fa-spin mr1' />}
                  {playText}
                </span>
              </span>
            )}{' '}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DemoForm;
