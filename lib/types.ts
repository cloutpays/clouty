export interface Option {
  value: string;
  key: string;
}
export interface GameProps {
  description: string;
  emoji: string;
  options: Option[];
  answer?: string;
  gameType: string;
  slug: string;
  extendedAnswer: string;
  class: string;
  question: string;
  userId: string;
  date: any;
}

export interface SubmissionProps {
  _id: string;
  email: string;
  answer: string;
  odds: string;
  handle: string;
  userId: string;
  wager: number;
  date: string;
  question: string;
  usedCredit: false;
}
