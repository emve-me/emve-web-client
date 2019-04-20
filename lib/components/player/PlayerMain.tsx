import { Component } from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'
import { VideoSubscription, VideoSubscriptionVariables } from '../../../gql_types/VideoSubscription'
import { withRouter, WithRouterProps } from 'next/router'
import UpComming from './UpComming'
import YouTube from 'react-youtube'

const VIDEOS_PUSHED = gql`
  subscription VideoSubscription ($channel:ID!){
    videoPushed(input:{channel:$channel}){
      id
    }
  }
`

class VideosSubscription extends Subscription <VideoSubscription, VideoSubscriptionVariables> {
}


const videos = ['zUyH3XhpLTo', 'vGc4mg5pul4', '3SQgTgDJMY8']

type S = {
  index: number
}

class PlayerMain extends Component <WithRouterProps<{ p: string; }>, S> {

  state = { index: 0 }

  render() {


    return (
      <YouTube
        videoId={videos[this.state.index]}
        opts={{
          height: '390',
          width: '640',
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1

          }

        }}
        onEnd={(event) => {
          console.log('on end', event)
          this.setState(({ index }) => ({ index: index + 1 }))
        }}
        onReady={this._onReady}
      />
    )
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    //event.target.pauseVideo()
  }


  shmendender() {

    return <UpComming channel={this.props.router.query.p}/>


    return <VideosSubscription onSubscriptionData={(dd) => console.log('IDDD', dd.subscriptionData.data.videoPushed.id)}
                               subscription={VIDEOS_PUSHED} variables={{ channel: this.props.router.query.p }}>
      {({ data, loading }) => {


        if (loading) {
          return <div>Loading</div>
        }

        if (!data) {
          return <div>Select a video</div>
        }

        return data.videoPushed.id

        return <iframe style={{ width: '100vw', height: '100vh' }} width="100%" height="100%"
                       src={`https://www.youtube.com/embed/${data.videoPushed.id}?autoplay=1`}
                       frameBorder="0"/>


      }}
    </
      VideosSubscription>

  }

}

export default withRouter(PlayerMain)