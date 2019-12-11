import React, { Component } from 'react'
import { withRouter, WithRouterProps } from 'next/router'
import ErrorBoundary from '../lib/ui/ErrorBoundary'
import LoggedInUserController from '../lib/consumers/LoggedInUserController'
import LoginAndJoin from '../lib/remote/LoginAndJoin'
import History from '../lib/history/History'

const HistoryPage = (props: WithRouterProps<{ p: string }>) => {
  const { p: channel } = props.router.query
  return (
    <ErrorBoundary>
      <LoggedInUserController>
        {({ loggedIn, user }) =>
          loggedIn ? <History channel={channel} /> : <LoginAndJoin />
        }
      </LoggedInUserController>
    </ErrorBoundary>
  )
}

export default withRouter(HistoryPage)
