export interface Option {
  value: string;
  key: string;
}
export interface GameProps {
  description: string;
  options: Option[];
  answer?: string;
  gameType: string;
  slug: string;
  extendedAnswer: string;
  title: string;
  category: string;
  details: string;
  question: string;
  userId: string;
  date: any;
}

export interface Submissions {
  _id: string;
  email: string;
  phoneNumber: string;
  wager: number;
  question: string;
  userId: string;
  handle: string;
  won: boolean;
  name: string;
  odds: string;
  details: string;
  date: string;
  answer: string;
  usedCredit: boolean;
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
