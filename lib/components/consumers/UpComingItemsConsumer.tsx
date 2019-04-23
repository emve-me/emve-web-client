import { Component } from 'react'
import { Query, withApollo, WithApolloClient } from 'react-apollo'
import {
  UpComingTracksGQL,
  UpComingTracksGQL_channel_tracks_edges, UpComingTracksGQL_channel_tracks_edges_node,
  UpComingTracksGQLVariables
} from '../../../gql_types/UpComingTracksGQL'
import gql from 'graphql-tag'
import ApolloClient from 'apollo-client'
import { VideoSubscription, VideoSubscriptionVariables } from '../../../gql_types/VideoSubscription'

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

// todo have a type for the cache shape
type TProps = {

  channel: string
  children: ({ upComing, loading, error }: { error?, loading: boolean, upComing?: Array<UpComingTracksGQL_channel_tracks_edges> }) => React.ReactNode
}

// make a track list provider
class UpComingItemsConsumer extends Component <WithApolloClient<TProps>> {

  subscription: ZenObservable.Subscription

  componentDidMount() {

    const { client, channel } = this.props

    const subscriptionObservable = client.subscribe<{ data: VideoSubscription }, VideoSubscriptionVariables>({
      query: VIDEOS_PUSHED,
      variables: { channel }
    })

    this.subscription = subscriptionObservable.subscribe({
      next({ data }) {

        console.log('subscription data', data)

        const query = client.readQuery<UpComingTracksGQL, UpComingTracksGQLVariables>({
          query: UPCOMING_QUERY,
          variables: { channel }
        })

        const toPush: UpComingTracksGQL_channel_tracks_edges = {
          __typename: 'TracksEdge',
          node: data.videoPushed
        }


        query.channel.tracks.edges.push(toPush)

//        console.log('TO PUSH', { toPush, query, data })

        client.writeQuery<UpComingTracksGQL, UpComingTracksGQLVariables>({
          variables: { channel },
          query: UPCOMING_QUERY,
          data: query
        })
      },
      error(err) {
        console.error(`Finished with error: ${err}`)
      },
      complete() {
        console.info('Finished subscription to', channel)
      }
    })
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  render() {
    return <UpComingTracksQuery query={UPCOMING_QUERY}
                                variables={{ channel: this.props.channel }}>{({ data, error, loading, subscribeToMore, client }) => {

      if (loading) {
        return this.props.children({ loading: true })
      }

      if (error) {
        return this.props.children({ loading: false, error })
      }

      console.log('data in up comming tracks query', data)

      const { edges } = data.channel.tracks

      console.log('UP COMMING', edges)
      return this.props.children({ error, upComing: edges, loading: false })
    }}</UpComingTracksQuery>
  }
}

export default withApollo<TProps>(UpComingItemsConsumer)


