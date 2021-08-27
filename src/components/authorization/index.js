import React from 'react';
import styles from './style.module.css';
import { fireAuth, fireGoogleProvider } from '../../firebase';
import { CURRENT_DAY } from '../../constants/routes';

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
    <div className={styles.buttonWrapper}>
      <button className={styles.button} onClick={signIn}>
        Sign In With Google
      </button>
    </div>
  );
};
