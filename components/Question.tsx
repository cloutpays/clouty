import { Input, Select } from 'antd';
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

const Question: React.FC<QuestionProps> = ({
  options,
  type,
  setAnswer,
  title,
}) => {
  return type === 'select' ? (
    <>
      <br />
      <label>{title}</label>
      <br />
      <Select onChange={(event) => setAnswer(event.toString())}>
        {options.map((option: Option, index: number) => (
          <Select.Option key={index} value={option.value}>
            {option.key}
          </Select.Option>
        ))}
      </Select>
    </>
  ) : (
    <>
      <br />
      <label>Insert your order of songs:</label>
      <br />

      <br />

      <Input
        type='text'
        name='answer'
        id='answer'
        onChange={(event) => setAnswer(event.currentTarget.value)}
      />
    </>
  );
};
export default Question;
