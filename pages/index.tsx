import React, { Component } from 'react'
import Login from '../lib/Login'
import LoggedInUserConsumer from '../lib/consumers/LoggedInUserConsumer'
import RemoteMain from '../lib/remote/RemoteMain'
import Shell from '../lib/Shell'
import ModeSelector from '../lib/home/mode_selector/ModeSelector'

type props = {}

type state = {}

export default class Index extends Component<props, state> {
  render() {
    return <LoggedInUserConsumer>{({ user, loggedIn }) => {

      if (!loggedIn) {
        return <Login/>
      } else {

        return <Shell>
          <ModeSelector/>
        </Shell>
      }
    }}
    </LoggedInUserConsumer>

  }
}
