import { Component } from 'react'
import { Query } from 'react-apollo'
import {
  UpComingTracksGQL,
  UpComingTracksGQL_channel_tracks_edges, UpComingTracksGQL_channel_tracks_edges_node,
  UpComingTracksGQLVariables
} from '../../../gql_types/UpComingTracksGQL'
import YouTube from 'react-youtube'
import { MarkAsPlayedGQL, MarkAsPlayedGQLVariables } from '../../../gql_types/MarkAsPlayedGQL'
import gql from 'graphql-tag'


export const TRAK_FRAG = gql`fragment TrackOnChannel on Track {
  id
  title
  videoId
  played
}`


const VIDEOS_PUSHED = gql`
  subscription VideoSubscription ($channel:ID!) {
    videoPushed(input:{channel:$channel}) {
      ... TrackOnChannel
    }
  }
${TRAK_FRAG}`

const UPCOMING_QUERY = gql`query UpComingTracksGQL($channel: ID!) {
  channel(id: $channel){
    tracks(played: false){
      edges{
        node{
          ... TrackOnChannel
        }
      }
    }
  }
}
${TRAK_FRAG}`

const GQL_MARK_AS_PLAYED = gql`mutation MarkAsPlayedGQL ($track : ID!) {
  markTrackAsPlayed(track: $track)
}`

type PlayerParams = {
  videoId: string, onEnd: (event) => void
}

const Player = ({ videoId, onEnd }: PlayerParams) => <YouTube
  videoId={videoId}
  opts={{
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  }}
  onEnd={onEnd}
/>


class UpComingTracksQuery extends Query<UpComingTracksGQL, UpComingTracksGQLVariables> {

}

type TProps = {
  channel: string
}

// make a track list provider
export default class UpComming extends Component <TProps> {

  render() {

    return <UpComingTracksQuery query={UPCOMING_QUERY}
                                variables={{ channel: this.props.channel }}>{({ data, error, loading, subscribeToMore, client }) => {

      if (loading) {
        return 'Loading'
      }

      if (error) {
        console.error(error)
        return 'Error'
      }

      subscribeToMore({
        document: VIDEOS_PUSHED, variables: { channel: this.props.channel }, updateQuery: (prev, next) => {

          console.log({ prev, next, pushed: (next.subscriptionData.data as any).videoPushed })

          const toPush: UpComingTracksGQL_channel_tracks_edges = {
            __typename: 'TracksEdge',
            node: (next.subscriptionData.data as any).videoPushed
          }

          prev.channel.tracks.edges.push(toPush)
          return prev
        }
      })


      const { edges } = data.channel.tracks

      console.log(edges.map(e => e.node.title))

      if (edges.length > 0) {
        return <Player videoId={edges[0].node.videoId} onEnd={async () => {
          const mutationUpdate = await client.mutate<MarkAsPlayedGQL, MarkAsPlayedGQLVariables>({
            mutation: GQL_MARK_AS_PLAYED,
            variables: { track: edges[0].node.id }
          })

          console.log('mutationUpdate', mutationUpdate)

          const queryyyy = client.readQuery<UpComingTracksGQL, UpComingTracksGQLVariables>({
            query: UPCOMING_QUERY,
            variables: { channel: this.props.channel }
          })

          queryyyy.channel.tracks.edges = queryyyy.channel.tracks.edges.filter(({ node }) => node.id !== edges[0].node.id)

          client.writeQuery<UpComingTracksGQL, UpComingTracksGQLVariables>({
            variables: { channel: this.props.channel },
            query: UPCOMING_QUERY,
            data: queryyyy
          })

          console.log('queryyyy')
//          const fragment = client.readFragment<TrackOnChannel>({ fragment: TRAK_FRAG, id: edges[0].node.id })
          //        console.log('FRAGMENT', fragment)

        }}/>
      }

      return <div>Add a video!!</div>

    }}</UpComingTracksQuery>
  }
}

// return data.channel.tracks.edges.map(({ node }) => <div key={node.id}>{node.title}</div>)


