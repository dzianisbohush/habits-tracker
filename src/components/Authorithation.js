import React from 'react';
import { fireAuth, fireGoogleProvider } from '../firebase';
import { CURRENT_DAY } from '../constants/routes';

export const Authorithation = ({ history }) => {
  const signIn = (event) => {
    event.preventDefault();
    fireAuth
      .signInWithPopup(fireGoogleProvider)
      .then(() => {
        history.push(CURRENT_DAY);
      })
      .catch((err) => {
        throw new Error(err);
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
