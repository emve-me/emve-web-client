import { Component } from 'react'
import { Query, withApollo, WithApolloClient } from 'react-apollo'
import {
  UpComingTracksGQL,
  UpComingTracksGQL_channel_owner,
  UpComingTracksGQL_channel_tracks_edges,
  UpComingTracksGQLVariables
} from '../../gql_types/UpComingTracksGQL'
import {
  VideoSubscription,
  VideoSubscriptionVariables
} from '../../gql_types/VideoSubscription'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { TrackOnChannel } from '../../gql_types/TrackOnChannel'
import { TrackState } from '../../gql_types/globalTypes'

export const TRAK_FRAG = gql`
  fragment TrackOnChannel on Track {
    id
    title
    videoId
    state
    thumb
    owner {
      id
      fullName
      firstName
      picture
    }
  }
`

const VIDEOS_PUSHED = gql`
  subscription VideoSubscription($channel: ID!) {
    trackUpdated(input: { channel: $channel }) {
      ...TrackOnChannel
    }
  }
  ${TRAK_FRAG}
`

const UPCOMING_QUERY = gql`
  query UpComingTracksGQL($channel: ID!) {
    channel(id: $channel) {
      nowPlaying {
        ...TrackOnChannel
      }
      owner {
        id
        fullName
        firstName
        picture
      }
      tracks(played: false) {
        edges {
          node {
            ...TrackOnChannel
          }
        }
      }
    }
  }
  ${TRAK_FRAG}
`

type TRenderProps = {
  client: ApolloClient<{}>
  updateCache?: (
    modifier: (data: UpComingTracksGQL) => UpComingTracksGQL
  ) => void
  error?
  loading: boolean
  upComing?: Array<UpComingTracksGQL_channel_tracks_edges>
  nowPlaying?: TrackOnChannel
  owner?: UpComingTracksGQL_channel_owner
  replaceNowPlaying?: (nowPlaying: TrackOnChannel) => void
}

// todo have a type for the cache shape
type TProps = {
  channel: string

  children: ({
    nowPlaying,
    upComing,
    loading,
    error,
    updateCache,
    client
  }: TRenderProps) => JSX.Element
}

// make a track list provider
class ChannelController extends Component<WithApolloClient<TProps>> {
  subscription: ZenObservable.Subscription

  componentDidMount() {
    const { client, channel } = this.props

    const subscriptionObservable = client.subscribe<
      VideoSubscription,
      VideoSubscriptionVariables
    >({
      query: VIDEOS_PUSHED,
      variables: { channel }
    })

    this.subscription = subscriptionObservable.subscribe({
      // REFACTOR NOTE, CHANGED THIS
      next: ({ data }) => {
        console.log('DATA', data)

        const channelState = this.readTracksFromCache()

        switch (data.trackUpdated.state) {
          case TrackState.remove:
            {
              if (channelState.channel.nowPlaying.id === data.trackUpdated.id) {
                // detect if its player only // and call a skip function on the player // OR do everything here
                return
              } else {
                channelState.channel.tracks.edges = channelState.channel.tracks.edges.filter(
                  ({ node }) => node.id !== data.trackUpdated.id
                )
              }
            }
            break
          case TrackState.playing:
            {
              channelState.channel.nowPlaying = data.trackUpdated
              channelState.channel.tracks.edges = channelState.channel.tracks.edges.filter(
                ({ node }) => node.id !== data.trackUpdated.id
              )
            }
            break
          case TrackState.played:
            {
              channelState.channel.tracks.edges = channelState.channel.tracks.edges.filter(
                ({ node }) => node.id !== data.trackUpdated.id
              )
              if (
                channelState.channel.nowPlaying &&
                channelState.channel.nowPlaying.id === data.trackUpdated.id
              ) {
                channelState.channel.nowPlaying = null
              }
            }
            break
          case TrackState.upcoming:
            {
              const toPush: UpComingTracksGQL_channel_tracks_edges = {
                __typename: 'TracksEdge',
                node: data.trackUpdated
              }

              const exists = channelState.channel.tracks.edges.find(
                ({ node }) => node.id === toPush.node.id
              )

              if (!exists) {
                channelState.channel.tracks.edges.push(toPush)
              } else {
                return
              }
            }
            break
        }

        this.writeTracksToCache(channelState)
      },
      error(err) {
        console.error(`Finished with error: ${err}`)
      },
      complete() {
        console.info('Finished subscription to', channel)
      }
    })

    window.onfocus = event => this.render()
  }

  replaceNowPlaying = (nowPlaying: TrackOnChannel) => {
    const channelState = this.readTracksFromCache()
    channelState.channel.nowPlaying = nowPlaying
    if (nowPlaying) {
      channelState.channel.tracks.edges = channelState.channel.tracks.edges.filter(
        ({ node }) => node.id !== nowPlaying.id
      )
    }
    this.writeTracksToCache(channelState)
  }

  readTracksFromCache = () => {
    const { client, channel } = this.props
    return client.readQuery<UpComingTracksGQL, UpComingTracksGQLVariables>({
      query: UPCOMING_QUERY,
      variables: { channel }
    })
  }

  writeTracksToCache = data => {
    const { client, channel } = this.props

    client.writeQuery<UpComingTracksGQL, UpComingTracksGQLVariables>({
      variables: { channel },
      query: UPCOMING_QUERY,
      data
    })

    this.forceUpdate()
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
    return (
      <Query<UpComingTracksGQL, UpComingTracksGQLVariables>
        query={UPCOMING_QUERY}
        variables={{ channel: this.props.channel }}>
        {({ data, error, loading, client }) => {
          if (loading) {
            return this.props.children({ loading: true, client })
          }

          if (error) {
            return this.props.children({ loading: false, error, client })
          }

          const { edges } = data.channel.tracks

          return this.props.children({
            replaceNowPlaying: this.replaceNowPlaying,
            nowPlaying: data.channel.nowPlaying,
            error,
            upComing: edges,
            loading: false,
            updateCache: this.readModWrite,
            client,
            owner: data.channel.owner
          })
        }}
      </Query>
    )
  }
}

export default withApollo<TProps>(ChannelController)
