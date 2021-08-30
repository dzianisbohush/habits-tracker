import firebase from 'firebase';

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_DATABASE_URL,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_SENDER_ID,
  appId: REACT_APP_APP_ID,
  databaseURL: REACT_APP_DATABASE_URL,
};

firebase.initializeApp(firebaseConfig);
export const fireDB = firebase.database();
export const fireAuth = firebase.auth();
export const fireGoogleProvider =
  new firebase.auth.GoogleAuthProvider();

export default firebase;
