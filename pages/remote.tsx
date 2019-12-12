import React, { createRef, Component } from 'react'
import RemoteMain from '../lib/remote/RemoteMain'
import { withRouter } from 'next/router'
import ErrorBoundary from '../lib/ui/ErrorBoundary'
import LoggedInUserController from '../lib/consumers/LoggedInUserController'
import LoginAndJoin from '../lib/remote/LoginAndJoin'

const Remote = props => {
  const { p: channel } = props.router.query
  return (
    <ErrorBoundary>
      <LoggedInUserController>
        {({ loggedIn, user }) =>
          loggedIn ? <RemoteMain channel={channel} /> : <LoginAndJoin />
        }
      </LoggedInUserController>
    </ErrorBoundary>
  )
}

export default withRouter(Remote)
