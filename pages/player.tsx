import { Component } from 'react'
import PlayerMain from '../lib/player/PlayerMain'
import { withRouter } from 'next/router'
import ErrorBoundary from '../lib/ui/ErrorBoundary'

const Player = props => {
  return (
    <ErrorBoundary>
      <PlayerMain channel={props.router.query.p} />
    </ErrorBoundary>
  )
}

export default withRouter(Player)
