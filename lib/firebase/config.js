const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'clouty-a1d49.firebaseapp.com',
  databaseURL: 'https://clouty-a1d49.firebaseio.com',
  projectId: 'clouty-a1d49',
  storageBucket: 'clouty-a1d49.appspot.com',
  messagingSenderId: '291953120378',
  appId: process.env.FIREBASE_APP_ID,
  measurementId: 'G-5H9NG41QGZ',
};

const firebaseDevConfig = {
  apiKey: process.env.FIREBASE_API_KEY_DEV,
  authDomain: 'clouty-dev-db87b.firebaseapp.com',
  databaseURL: 'https://clouty-dev-db87b.firebaseio.com',
  projectId: 'clouty-dev-db87b',
  storageBucket: 'clouty-dev-db87b.appspot.com',
  messagingSenderId: '936417933277',
  appId: process.env.FIREBASE_APP_ID_DEV,
  measurementId: 'G-GQE044KGQ4',
};

export { firebaseConfig, firebaseDevConfig };
