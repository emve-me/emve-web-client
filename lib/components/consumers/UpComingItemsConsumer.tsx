import { Component } from 'react'
import { Query, withApollo, WithApolloClient } from 'react-apollo'
import {
  UpComingTracksGQL, UpComingTracksGQL_channel_tracks_edges, UpComingTracksGQLVariables
} from '../../../gql_types/UpComingTracksGQL'
import { VideoSubscription, VideoSubscriptionVariables } from '../../../gql_types/VideoSubscription'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'

export const TRAK_FRAG = gql`fragment TrackOnChannel on Track {
  id
  title
  videoId
  state
}`

const VIDEOS_PUSHED = gql`
  subscription VideoSubscription ($channel:ID!) {
    trackUpdated(input:{channel:$channel}) {
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

//
// todo have a type for the cache shape
type TProps = {
  channel: string
  children: ({ upComing, loading, error, updateCache, client }: { client: ApolloClient<{}>, updateCache?: (modifier: (data: UpComingTracksGQL) => UpComingTracksGQL) => void, error?, loading: boolean, upComing?: Array<UpComingTracksGQL_channel_tracks_edges> }) => React.ReactNode
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
      next: ({ data }) => {

        console.log('subscription data', data)

        // const toPush: UpComingTracksGQL_channel_tracks_edges = {
        //   __typename: 'TracksEdge',
        //   node: data.trackUpdated
        // }
        //
        // this.readModWrite(dd => {
        //   dd.channel.tracks.edges.push(toPush)
        //   return dd
        // })
      },
      error(err) {
        console.error(`Finished with error: ${err}`)
      },
      complete() {
        console.info('Finished subscription to', channel)
      }
    })
  }

  readTracksFromCache = () => {
    const { client, channel } = this.props
    return client.readQuery<UpComingTracksGQL, UpComingTracksGQLVariables>({
      query: UPCOMING_QUERY,
      variables: { channel }
    })
  }

  writeTracksToCache = (data) => {
    const { client, channel } = this.props
    client.writeQuery<UpComingTracksGQL, UpComingTracksGQLVariables>({
      variables: { channel },
      query: UPCOMING_QUERY,
      data
    })
  }

  readModWrite = (modifier: (data: UpComingTracksGQL) => UpComingTracksGQL) => {
    this.writeTracksToCache(modifier(this.readTracksFromCache()))
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  render() {
    return <UpComingTracksQuery query={UPCOMING_QUERY}
                                variables={{ channel: this.props.channel }}>{({ data, error, loading, client }) => {

      if (loading) {
        return this.props.children({ loading: true, client })
      }

      if (error) {
        return this.props.children({ loading: false, error, client })
      }

      const { edges } = data.channel.tracks

      return this.props.children({ error, upComing: edges, loading: false, updateCache: this.readModWrite, client })
    }}</UpComingTracksQuery>
  }
}

export default withApollo<TProps>(UpComingItemsConsumer)


