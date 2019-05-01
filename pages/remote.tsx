import React, { createRef, Component } from 'react'
import RemoteMain from '../lib/remote/RemoteMain'
import { withRouter, WithRouterProps } from 'next/router'
import ErrorBoundary from '../lib/ui/ErrorBoundary'
import LoggedInUserController from '../lib/consumers/LoggedInUserController'
import Shell from '../lib/Shell'
import Login from '../lib/Login'

class Remote extends Component<WithRouterProps<{ p: string }>> {
  render() {
    const { p: channel } = this.props.router.query
    return (
      <ErrorBoundary>
        <LoggedInUserController>
          {({ loggedIn, user }) =>
            loggedIn ? (
              <RemoteMain channel={channel} />
            ) : (
              <Shell>
                <div>
                  <h1>You're party awaits!</h1>

                  <Login />
                </div>
              </Shell>
            )
          }
        </LoggedInUserController>
      </ErrorBoundary>
    )
  }
}

export default withRouter(Remote)
