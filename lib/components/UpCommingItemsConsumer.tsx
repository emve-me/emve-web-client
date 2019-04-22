import { Component } from 'react'
import { Query } from 'react-apollo'
import {
  UpComingTracksGQL,
  UpComingTracksGQL_channel_tracks_edges, UpComingTracksGQL_channel_tracks_edges_node,
  UpComingTracksGQLVariables
} from '../../gql_types/UpComingTracksGQL'
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


class UpComingTracksQuery extends Query<UpComingTracksGQL, UpComingTracksGQLVariables> {

}

type TProps = {
  channel: string
  children: ({ upComming, loading, error }: { error?, loading: boolean, upComming?: Array<UpComingTracksGQL_channel_tracks_edges> }) => React.ReactNode
}

// make a track list provider
export default class UpCommingItemsConsumer extends Component <TProps> {

  render() {

    console.log('upcomming!?')

    return <UpComingTracksQuery query={UPCOMING_QUERY}
                                variables={{ channel: this.props.channel }}>{({ data, error, loading, subscribeToMore, client }) => {

      if (loading) {
        return this.props.children({ loading: true })
      }

      if (error) {
        return this.props.children({ loading: false, error })
      }

      subscribeToMore({
        document: VIDEOS_PUSHED, variables: { channel: this.props.channel }, updateQuery: (prev, next) => {

          const toPush: UpComingTracksGQL_channel_tracks_edges = {
            __typename: 'TracksEdge',
            node: (next.subscriptionData.data as any).videoPushed
          }

          prev.channel.tracks.edges.push(toPush)
          console.log('TO PUSH CONSUMER', toPush)
          // videoPushed: {id: "100", title: "The agony of trying to unsubscribe | James Veitch", videoId: "Dceyy0cX6J4", played: false, __typename: "Track"}
          return prev
        }
      })

      const { edges } = data.channel.tracks

      console.log('UP COMMING', edges.map(({ node }) => node.title))
      return this.props.children({ error, upComming: edges, loading: false })
    }}</UpComingTracksQuery>
  }
}


