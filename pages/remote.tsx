import React, { createRef, Component } from 'react'
import RemoteMain from '../lib/remote/RemoteMain'
import { withRouter, WithRouterProps } from 'next/router'
import ErrorBoundary from '../lib/ui/ErrorBoundary'
import LoggedInUserController from '../lib/consumers/LoggedInUserController'
import Shell from '../lib/ui/Shell'
import Login from '../lib/ui/Login'
import LoginAndJoin from '../lib/remote/LoginAndJoin'

const Remote = (props: WithRouterProps<{ p: string }>) => {
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
