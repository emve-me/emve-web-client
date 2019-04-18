import React, { Component } from 'react'
import Login from '../lib/components/Login'
import LoggedInUserConsumer from '../lib/components/LoggedInUserConsumer'
import RemoteMain from '../lib/components/remote/RemoteMain'
import ChannelCreate from '../lib/components/remote/ChannelCreate'
import AccountThumb from '../lib/components/AccountThumb'

type props = {}

type state = {}

export default class Index extends Component<props, state> {
  render() {
    return <LoggedInUserConsumer>{({ user, loggedIn }) => {

      if (!loggedIn) {
        return <Login/>
      } else {

        return <div>
          <AccountThumb/>
          <ChannelCreate/>
        </div>
      }
    }}
    </LoggedInUserConsumer>

  }
}
