import React, { Component } from 'react'
import Login from '../lib/components/Login'
import LoggedInUserConsumer from '../lib/components/LoggedInUserConsumer'
import { PlayerMain } from '../lib/components/player/PlayerMain'

type props = {}

type state = {}

export default class Index extends Component<props, state> {
  render() {
    return <LoggedInUserConsumer>{({ user, loggedIn }) => {

      if (!loggedIn) {
        <Login/>
      } else {
        return <PlayerMain/>
      }
    }}
    </LoggedInUserConsumer>

  }
}
