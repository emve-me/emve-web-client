import React, { Component } from 'react'
import Login from '../lib/components/Login'
import LoggedInUserConsumer from '../lib/components/LoggedInUserConsumer'
import RemoteMain from '../lib/components/remote/RemoteMain'
import ChannelCreate from '../lib/components/start/ChannelCreate'
import AccountThumb from '../lib/components/AccountThumb'
import Router from 'next/router'
import Link from 'next/link'

type props = {}

type state = {}

export default class Index extends Component<props, state> {
  render() {
    return <LoggedInUserConsumer>{({ user, loggedIn }) => {

      if (!loggedIn) {
        return <Login/>
      } else {

        return <div>

          <Link href='/join'>
            <div>Join Party</div>
          </Link>
          <Link href='/start'>
            <div>Start a Party</div>
          </Link>
        </div>
      }
    }}
    </LoggedInUserConsumer>

  }
}
