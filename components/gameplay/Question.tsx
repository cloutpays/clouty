import React from 'react';

interface Option {
  value: string;
  odds: string;
}

interface QuestionProps {
  gameType: string;
  options: Option[];
  setAnswer: React.Dispatch<React.SetStateAction<Option>>;
  title: string;
}

const Question: React.FC<QuestionProps> = ({
  options,
  gameType,
  setAnswer,
}) => {
  return (
    <div className='mt2'>
      <div className='mt2'>
        <label className='fw6 '>Enter your bet:</label>
      </div>
      {gameType === 'game' && (
        <div className='dib-ns'>
          <div className='flex flex-wrap'>
            {options.map((option: Option, key: number) => (
              <div
                key={key}
                onClick={() => setAnswer(option)}
                className='noselect grow outline dim pa2 mr2 mt2'>
                <strong>
                  {option.value} {option.odds && `(${option.odds})`}
                </strong>
              </div>
            ))}
          </div>
        </div>
      )}
      {gameType === 'fill-in-blank' && (
        <div>
          <input
            type='text'
            placeholder=''
            name='answer'
            id='answer'
            className='pa1 mt2 input-reset ba bg-transparent hover-bg-black white hover-white w-80'
            onChange={(event) =>
              setAnswer({ value: event.currentTarget.value, odds: '' })
            }
          />
        </div>
      )}
    </div>
  );
};
export default Question;
