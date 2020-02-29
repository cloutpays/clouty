import React from 'react';

interface Option {
  value: string;
}

interface QuestionProps {
  type: string;
  options: Option[];
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  title: string;
}

const Question: React.FC<QuestionProps> = ({ options, type, setAnswer }) => {
  return type === 'select' ? (
    <div className='mt2'>
      <div className='mt2'>
        <label className='fw6 '>Place your bet:</label>
      </div>
      <div className='dib-ns'>
        <div className='flex flex-wrap'>
          {options.map((option: Option, key: number) => (
            <div
              key={key}
              onClick={() => setAnswer(option.value)}
              className='noselect grow outline dim pa2 mr2 mt2'>
              <strong>{option.value}</strong>
            </div>
          ))}
          {/* {options.length === 1 && (
            <div
              // onClick={() => setWager([Number(1), Number(5), Number(10)])}
              className='noselect grow outline dim pa2 mr2 mt2'>
              <strong>Reset</strong>
            </div>
          )} */}
        </div>
      </div>
    </div>
  ) : (
    <>
      <br />
      <input
        type='text'
        placeholder='Insert your order of songs'
        name='answer'
        id='answer'
        onChange={(event) => setAnswer(event.currentTarget.value)}
      />
    </>
  );
};
export default Question;
