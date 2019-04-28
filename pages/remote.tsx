import React, { createRef, Component } from 'react'
import RemoteMain from '../lib/remote/RemoteMain'
import Shell from '../lib/Shell'
import { withRouter, WithRouterProps } from 'next/router'
import { SearchBox } from '../lib/remote/search/SearchBox'

class Remote extends Component <WithRouterProps<{ p: string }>> {


  render() {

    const { p: channel } = this.props.router.query

    // shell is populated with an empty search box for SSR rendering
    return <Shell header={
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBox width='800px' placeholder='Search YouTube'/>
      </div>}><RemoteMain channel={channel}/></Shell>
  }

}

export default withRouter(Remote)