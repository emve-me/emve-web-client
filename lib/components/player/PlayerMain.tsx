import { Component } from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'
import { VideoSubscription } from './__generated__/VideoSubscription'

const VIDEOS_PUSHED = gql`
  subscription VideoSubscription {
    videoPushed{
      id
    }
  }
`

class VideosSubscription extends Subscription <VideoSubscription> {

}

export class PlayerMain extends Component {

  render() {

    return <VideosSubscription subscription={VIDEOS_PUSHED}>
      {({ data, loading }) => {


        if (loading) {
          return <div>Loading</div>
        }

        return <iframe style={{ width: '100vw', height: '100vh' }} width="100%" height="100%"
                       src={`https://www.youtube.com/embed/${data.videoPushed.id}?autoplay=1`}
                       frameBorder="0"/>


      }}
    </VideosSubscription>

  }

}