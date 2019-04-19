import { Component } from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'
import { VideoSubscription, VideoSubscriptionVariables } from '../../../gql_types/VideoSubscription'
import { withRouter, WithRouterProps } from 'next/router'

const VIDEOS_PUSHED = gql`
  subscription VideoSubscription ($channel:ID!){
    videoPushed(input:{channel:$channel}){
      id
    }
  }
`

class VideosSubscription extends Subscription <VideoSubscription, VideoSubscriptionVariables> {
}


class PlayerMain extends Component <WithRouterProps<{ p: string; }>, {}> {

  render() {

    return <VideosSubscription subscription={VIDEOS_PUSHED} variables={{ channel: this.props.router.query.p }}>
      {({ data, loading }) => {


        if (loading) {
          return <div>Loading</div>
        }

        if (!data) {
          return <div>Select a video</div>
        }

        return <iframe style={{ width: '100vw', height: '100vh' }} width="100%" height="100%"
                       src={`https://www.youtube.com/embed/${data.videoPushed.id}?autoplay=1`}
                       frameBorder="0"/>


      }}
    </VideosSubscription>

  }

}

export default withRouter(PlayerMain)