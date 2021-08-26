import React, { useContext } from 'react'
import '../App.css'
import { fireAuth } from '../firebase'
import { UserContext } from '../utils/context'

export const Header = () => {
  const { email } = useContext(UserContext)

  const signOut = () => {
    fireAuth.signOut()
  }

  return (
    <div className="header-wrapper">
      <p className='userEmail'>{email}</p>
      <button className="button" onClick={signOut}>
        Sign Out
      </button>
    </div>
  )
}
