import React, { createRef, Component } from 'react'
import RemoteMain from '../lib/remote/RemoteMain'
import { withRouter, WithRouterProps } from 'next/router'
import ErrorBoundary from '../lib/ui/ErrorBoundary'

class Remote extends Component<WithRouterProps<{ p: string }>> {
  render() {
    const { p: channel } = this.props.router.query
    return (
      <ErrorBoundary>
        <RemoteMain channel={channel} />
      </ErrorBoundary>
    )
  }
}

export default withRouter(Remote)
