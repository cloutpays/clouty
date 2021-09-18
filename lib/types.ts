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

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  phoneNumber: string;
  emailAddress: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  dateOfBirth: string;
  updatedAt: string;
}

export interface Sources {
  name: string;
}

export interface Contract {
  userId: string;
  expirationTs: number;
  marketId: string;
  maxCostCents: number;
  price: number;
  side: boolean;
}

export interface MarketProps {
  expiration: Date;
  price: number;
  quantity: number;
  class: string;
  createDate: Date;
  description: string;
  caseNo?: string;
  caseYes?: string;
  openDate: Date;
  lastPrice: number;
  prevYesBid: number;
  prevYesAsk: number;
  yesBid: number;
  yesAsk: number;
  title: string;
  imageUrl: string;
  tags: string[];
  source: Sources[];
  likes: number;
  status: string;
  minTickSize: number;
  volume: number;
  underlying: string;
  resolution: string;
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
