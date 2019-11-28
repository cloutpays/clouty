import React from 'react';

interface Option {
  value: string;
  key: string;
}

interface QuestionProps {
  answer: string;
  htmlFor: string;
  name: string;
  options: Option[];
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  title: string;
}

const Question: React.FC<QuestionProps> = ({
  answer,
  htmlFor,
  name,
  options,
  setAnswer,
  title,
}) => (
  <>
    <br></br>
    <label htmlFor={htmlFor}>{title}</label>
    <br></br>
    <select
      required
      onChange={(event) => setAnswer(event.currentTarget.value)}
      value={answer}
      name={name}>
      {options.map((option: Option, index: number) => (
        <option key={index} value={option.value}>
          {option.key}
        </option>
      ))}
    </select>
  </>
);

export default Question;