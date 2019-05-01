import { Component } from 'react'
import PlayerMain from '../lib/player/PlayerMain'
import { withRouter, WithRouterProps } from 'next/router'
import ErrorBoundary from '../lib/ui/ErrorBoundary'

class Player extends Component<WithRouterProps<{ p: string }>> {
  render() {
    return (
      <ErrorBoundary>
        <PlayerMain channel={this.props.router.query.p} />
      </ErrorBoundary>
    )
  }
}

export default withRouter(Player)
