import { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { UpComingTracksGQL, UpComingTracksGQLVariables } from '../../../gql_types/UpComingTracksGQL'
import YouTubePlayer from 'youtube-player'
import YouTube from 'react-youtube'


const VIDEOS_PUSHED = gql`
  subscription VideoSubscription ($channel:ID!){
    videoPushed(input:{channel:$channel}){
      id
    }
  }
`
const UPCOMING_QUERY = gql`query UpComingTracksGQL($channel: ID!) {
  channel(id: $channel){
    tracks{
      edges{
        node{
          id
          title
          videoId
        }
      }
    }
  }
}`

const Player = ({ videId }) => {
  return <YouTube
    videoId={videId}
    opts={{
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }}
    onEnd={(event) => {
      console.log('on end', event)
    }}

  />

}

class UpComingTracksQuery extends Query<UpComingTracksGQL, UpComingTracksGQLVariables> {

}

type TProps = {
  channel: string
}

export default class UpComming extends Component <TProps> {

  render() {


    return <UpComingTracksQuery query={UPCOMING_QUERY}
                                variables={{ channel: this.props.channel }}>{({ data, loading, subscribeToMore }) => {
      if (loading) {
        return 'Loading'
      }

      subscribeToMore({
        document: VIDEOS_PUSHED, variables: { channel: this.props.channel }, updateQuery: (prev, next) => {

          console.log('SUSBCRIPTION DATA', next.subscriptionData.data.channel)

          console.log({ prev })

          return {
            channel:
              null


          }
        }
      })

      const { edges } = data.channel.tracks

      if (edges.length > 0) {


        return <Player videId={edges[0].node.videoId}/>
//        return edges[0].node.videoId
      }

      return <div>Add a video!!</div>

    }}</UpComingTracksQuery>
  }
}

// return data.channel.tracks.edges.map(({ node }) => <div key={node.id}>{node.title}</div>)


