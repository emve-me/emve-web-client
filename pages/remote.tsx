import React, { createRef, Component } from 'react'
import RemoteMain from '../lib/remote/RemoteMain'
import { withRouter, WithRouterProps } from 'next/router'

class Remote extends Component <WithRouterProps<{ p: string }>> {

  render() {
    const { p: channel } = this.props.router.query
    return <RemoteMain channel={channel}/>
  }
}

export default withRouter(Remote)