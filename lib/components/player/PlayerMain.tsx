import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'
import { VideoSubscription, VideoSubscriptionVariables } from '../../../gql_types/VideoSubscription'
import { withRouter, WithRouterProps } from 'next/router'
import UpComing from './UpComing'
import YouTube from 'react-youtube'
import UpComingItemsConsumer from '../consumers/UpComingItemsConsumer'

class PlayerMain extends Component <WithRouterProps<{ p: string; }>, {}> {

  render() {

    const { p: channel } = this.props.router.query

    return <UpComingItemsConsumer channel={channel}>{({ error, loading, upComing }) => {

      if (loading) {
        return 'Loading'
      }

      return upComing.map(ele => <div key={ele.node.id}>{ele.node.title}</div>)

    }}</UpComingItemsConsumer>
  }
}

export default withRouter(PlayerMain)