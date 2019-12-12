import React, { Component } from 'react'
import ModeSelector from '../lib/home/mode_selector/ModeSelector'
import LoginSplash from '../lib/home/LoginSplash'
import { useLoggedInUser } from '../lib/consumers/useLoggedInUser'

export default () => {
  const { loggedIn } = useLoggedInUser()

  if (!loggedIn) {
    return <LoginSplash />
  } else {
    return <ModeSelector />
  }
}
