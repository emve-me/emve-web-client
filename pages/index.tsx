import React, { Component } from 'react'
import Login from '../lib/Login'
import LoggedInUserController from '../lib/consumers/LoggedInUserController'
import Shell from '../lib/Shell'
import ModeSelector from '../lib/home/mode_selector/ModeSelector'
import LoginSplash from '../lib/home/LoginSplash'

type props = {}

type state = {}

export default class Index extends Component<props, state> {
  render() {
    return (
      <LoggedInUserController>
        {({ user, loggedIn }) => {
          if (!loggedIn) {
            return <LoginSplash />
          } else {
            return (
              <Shell>
                <ModeSelector />
              </Shell>
            )
          }
        }}
      </LoggedInUserController>
    )
  }
}
