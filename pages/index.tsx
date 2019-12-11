import React, { Component } from 'react'
import Login from '../lib/ui/Login'
import LoggedInUserController from '../lib/consumers/LoggedInUserController'
import Shell from '../lib/ui/Shell'
import ModeSelector from '../lib/home/mode_selector/ModeSelector'
import LoginSplash from '../lib/home/LoginSplash'

type props = {}

type state = {}

export default () => {
  return (
    <LoggedInUserController>
      {({ user, loggedIn }) => {
        if (!loggedIn) {
          return <LoginSplash />
        } else {
          return <ModeSelector />
        }
      }}
    </LoggedInUserController>
  )
}
