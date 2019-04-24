import React, { Component } from 'react'
import RemoteMain from '../lib/components/remote/RemoteMain'
import Shell from '../lib/components/Shell'

export default class Remote extends Component {

  render() {
    return <Shell><RemoteMain/></Shell>
  }

}