import React from 'react';

interface Option {
  value: string;
  key: string;
}

interface QuestionProps {
  type: string;
  options: Option[];
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  title: string;
}

const Question: React.FC<QuestionProps> = ({ options, type, setAnswer }) => {
  return type === 'select' ? (
    <>
      <br />
      <label className='fw6'>Place your bet:</label>
      <br />
      <select onChange={(event) => setAnswer(event.currentTarget.value)}>
        <option value='none' selected={true} disabled={true} hidden={true}>
          Select an Option
        </option>
        {options.map((option: Option, index: number) => (
          <option key={index} value={option.value}>
            {option.key}
          </option>
        ))}
      </select>
    </>
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
