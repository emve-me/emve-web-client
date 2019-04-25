import { Component } from 'react'
import PlayerMain from '../lib/player/PlayerMain'
import { withRouter, WithRouterProps } from 'next/router'

class Player extends Component <WithRouterProps<{ p: string; }>> {

  render() {
    return <PlayerMain channel={this.props.router.query.p}/>
  }
}

export default withRouter(Player)