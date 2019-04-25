import React, { Component } from 'react'
import RemoteMain from '../lib/remote/RemoteMain'
import Shell from '../lib/Shell'
import { withRouter, WithRouterProps } from 'next/router'

class Remote extends Component <WithRouterProps<{ p: string }>> {

  render() {

    const { p: channel } = this.props.router.query

    return <Shell><RemoteMain channel={channel}/></Shell>
  }

}

export default withRouter(Remote)