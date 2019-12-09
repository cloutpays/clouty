import React from 'react';
import Question from './Question';

interface QuestionControllerProps {
  answer: string;
  question: number;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
}

const QUESTIONS = {
  1: {
    options: [
      { value: 'The Game', key: 'The Game' },
      { value: 'Fabolous', key: 'Fabolous' },
    ],
    type: 'select',
    title: 'Place your bet:',
  },
  2: {
    options: [
      { value: 'Yes', key: 'Yes' },
      { value: 'No', key: 'No' },
    ],
    title: 'Place your bet:',
    type: 'select',
  },
  3: {
    options: [
      { value: 'Fivio Foreign', key: 'Fivio Foreign' },
      { value: 'Pop Smoke', key: 'Pop Smoke' },
    ],
    title: 'Place your bet:',
    type: 'select',
  },
  4: {
    options: [
      { value: 'Azchike', key: 'Azchike' },
      { value: 'Smino', key: 'Smino' },
      { value: 'Malia', key: 'Malia' },
      { value: 'Neither', key: 'Neither' },
    ],
    type: 'select',
    title: 'Place your bet:',
  },
  5: {
    options: [
      { value: 'Roddy Rich "PEMFBA"', key: 'Roddy Rich "PEMFBA"' },
      { value: 'Max B "House Money"', key: 'Max B "House Money"' },
      {
        value: 'French Montana "MONTANA"',
        key: 'French Montana "MONTANA"',
      },
    ],
    type: 'select-multiple',
    title: 'Place your bet:',
  },
  6: {
    options: [
      { value: 'Bacc Seat ft. Ty $ Sign', key: 'Bacc Seat ft. Ty $ Sign' },
      { value: ' Tip Toe ft. A Boogie ', key: ' Tip Toe ft. A Boogie ' },
      {
        value: 'Moonwalkin Ft. Lil durk ',
        key: 'Moonwalkin Ft. Lil durk ',
      },
      {
        value: 'Peta Ft. Meek Mill',
        key: 'Peta Ft. Meek Mill',
      },
    ],
    type: 'select',
    title: 'Place your bet:',
  },
};

const mapQuestion = (question: number) => {
  switch (question) {
    case 1:
      return QUESTIONS[1];
    case 2:
      return QUESTIONS[2];
    case 3:
      return QUESTIONS[3];
    case 4:
      return QUESTIONS[4];
    case 5:
      return QUESTIONS[5];
    case 6:
      return QUESTIONS[6];
    default:
      return QUESTIONS[1];
  }
};

const QuestionController: React.FC<QuestionControllerProps> = ({
  question,
  setAnswer,
}) => {
  const activeQuestion = mapQuestion(question);
  const { options, type, title } = activeQuestion;
  return (
    <Question
      type={type}
      options={options}
      title={title}
      setAnswer={setAnswer}
    />
  );
};

export default QuestionController;
