import React from 'react'
import { fireAuth, fireGoogleProvider } from '../firebase'
import { TODO } from '../constants/routes'

export const Authorithation = ({history, setUser}) => {
    const signIn = (event) => {
        event.preventDefault();
        fireAuth.signInWithPopup(fireGoogleProvider)
        .then((data) => {
            console.log(data);
            setUser(data)
            history.push(TODO)
        })
        .catch(({ message }) => {
            console.log("blya", message)
        });
    };
    return (
        <div className='buttonWrapper'>
            <button className='button' onClick={signIn}>Sign In With Google</button>
        </div>
    )
}