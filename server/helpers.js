export const dev =
  process.env.NODE_ENV === 'development' || process.env.ENV === 'development';
export const question = dev ? 'questiondev' : 'question';
export const cloutpays = dev ? 'cloutpaysdev' : 'cloutpays';
export const user = dev ? 'userdev' : 'user';
export const payout = dev ? 'payoutdev' : 'user';
