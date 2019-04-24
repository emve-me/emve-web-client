import React, { Component } from 'react'
import RemoteMain from '../lib/remote/RemoteMain'
import Shell from '../lib/Shell'

export default class Remote extends Component {

  render() {
    return <Shell><RemoteMain/></Shell>
  }

}