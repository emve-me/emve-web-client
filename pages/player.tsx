import React, { Component } from 'react'
import PlayerMain from '../lib/player/PlayerMain'
import Shell from '../lib/Shell'


export default class Index extends Component {
  render() {
    return <Shell><PlayerMain/></Shell>
  }
}
