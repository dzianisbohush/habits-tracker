import React from 'react';
import { fireAuth, fireGoogleProvider } from '../firebase';
import { TODO_TEST } from '../constants/routes';

export const Authorithation = ({ history }) => {
  const signIn = (event) => {
    event.preventDefault();
    fireAuth
      .signInWithPopup(fireGoogleProvider)
      .then(() => {
        history.push(TODO_TEST);
      })
      .catch(({ message }) => {
        console.log('blya', message);
      });
  };
  return (
    <div className="buttonWrapper">
      <button className="button" onClick={signIn}>
        Sign In With Google
      </button>
    </div>
  );
};
