import React from 'react';
interface OptionProps {
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
    <br />
    <label htmlFor={htmlFor}>{title}</label>
    <br />
    <select
      required={true}
      onChange={(event) => setAnswer(event.currentTarget.value)}
      value={answer}
      name={name}>
      {options.map((option: OptionProps, index: number) => (
        <option key={index} value={option.value}>
          {option.key}
        </option>
      ))}
    </select>
  </>
);

export default Question;
