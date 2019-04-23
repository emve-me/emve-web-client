import React, { Component } from 'react'
import Login from '../lib/components/Login'
import LoggedInUserConsumer from '../lib/components/consumers/LoggedInUserConsumer'
import PlayerMain  from '../lib/components/player/PlayerMain'
import Shell from '../lib/components/Shell'


export default class Index extends Component{
  render() {

    return <Shell><PlayerMain/></Shell>


  }
}
