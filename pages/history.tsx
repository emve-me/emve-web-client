import React, { Component } from 'react'
import { withRouter, WithRouterProps } from 'next/router'
import ErrorBoundary from '../lib/ui/ErrorBoundary'
import LoggedInUserController from '../lib/consumers/LoggedInUserController'
import LoginAndJoin from '../lib/remote/LoginAndJoin'
import History from '../lib/history/History'

class HistoryPage extends Component<WithRouterProps<{ p: string }>> {
  render() {
    const { p: channel } = this.props.router.query
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
}

export default withRouter(HistoryPage)
