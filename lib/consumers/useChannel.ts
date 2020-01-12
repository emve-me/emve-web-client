import { useEffect } from 'react'
import { useQuery, useApolloClient } from 'react-apollo'
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
import { TrackOnChannel } from '../../gql_types/TrackOnChannel'
import { PlayerControlAction, TrackState } from '../../gql_types/globalTypes'
import ApolloClient from 'apollo-client'
import {
  MarkAsPlayedGQL,
  MarkAsPlayedGQLVariables
} from '../../gql_types/MarkAsPlayedGQL'
import {
  PlayerControls,
  PlayerControlsVariables
} from '../../gql_types/PlayerControls'
import { ZenObservable } from 'zen-observable-ts/lib/types'

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

export const VIDEOS_PUSHED = gql`
  subscription VideoSubscription($channel: ID!) {
    trackUpdated(input: { channel: $channel }) {
      ...TrackOnChannel
    }
  }
  ${TRAK_FRAG}
`

export const UPCOMING_QUERY = gql`
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

export const GQL_MARK_AS_PLAYED = gql`
  mutation MarkAsPlayedGQL($track: ID!, $nextTrack: ID) {
    markTrackAsPlayed(input: { track: $track, nextTrack: $nextTrack })
  }
`

type TReturn = {
  updateCache?: (
    modifier: (data: UpComingTracksGQL) => UpComingTracksGQL
  ) => void
  error?: any
  loading: boolean
  upComing?: Array<UpComingTracksGQL_channel_tracks_edges>
  nowPlaying?: TrackOnChannel
  nextTrack?: () => void
  owner?: UpComingTracksGQL_channel_owner
  replaceNowPlaying?: (nowPlaying: TrackOnChannel) => void
}

const GQL_PLAYER_CONTROLS = gql`
  subscription PlayerControls($channel: ID!) {
    playerControl(input: { channel: $channel }) {
      action
    }
  }
`

// todo have a type for the cache shape

class ControllerMethods {
  client: ApolloClient<any>
  channel: string

  constructor(client: ApolloClient<any>, channel: string) {
    this.client = client
    this.channel = channel
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

  readTracksFromCache = (
    cloned: boolean = true
  ): Readonly<UpComingTracksGQL> => {
    const resp = this.client.readQuery<
      UpComingTracksGQL,
      UpComingTracksGQLVariables
    >({
      query: UPCOMING_QUERY,
      variables: { channel: this.channel }
    })

    return cloned ? JSON.parse(JSON.stringify(resp)) : resp
  }

  writeTracksToCache = (data: any) => {
    this.client.writeQuery<UpComingTracksGQL, UpComingTracksGQLVariables>({
      variables: { channel: this.channel },
      query: UPCOMING_QUERY,
      data: data
    })
  }

  nextTrack = async () => {
    const upComing = this.readTracksFromCache(false)

    if (upComing.channel.tracks.edges.length > 0) {
      this.replaceNowPlaying(upComing.channel.tracks.edges[0].node)

      this.client.mutate<MarkAsPlayedGQL, MarkAsPlayedGQLVariables>({
        mutation: GQL_MARK_AS_PLAYED,
        variables: {
          track: upComing.channel.nowPlaying.id,
          nextTrack: upComing.channel.tracks.edges[0].node.id
        }
      })
    } else {
      this.replaceNowPlaying(null)

      this.client.mutate<MarkAsPlayedGQL, MarkAsPlayedGQLVariables>({
        mutation: GQL_MARK_AS_PLAYED,
        variables: { track: upComing.channel.nowPlaying.id }
      })
    }
  }
}

// make a track list provider
const useChannel = ({
  channel,
  onPlayer
}: {
  channel: string
  onPlayer: boolean
}): TReturn => {
  const client = useApolloClient()
  const channelController = new ControllerMethods(client, channel)

  useEffect(() => {
    // only the player needs to subscribe to these events
    let playerSubscription: ZenObservable.Subscription

    if (onPlayer) {
      const playerControlsSubscriptionObservable = client.subscribe<
        PlayerControls,
        PlayerControlsVariables
      >({
        query: GQL_PLAYER_CONTROLS,
        variables: {
          channel
        }
      })

      playerSubscription = playerControlsSubscriptionObservable.subscribe({
        next: ({ data }) => {
          switch (data.playerControl.action) {
            case PlayerControlAction.SKIP:
              channelController.nextTrack()
              break
          }
        },
        error(err) {
          console.error(`Finished with error: ${err}`)
        },
        complete() {
          console.info('Finished subscription to', channel)
        }
      })
    }
    const subscriptionObservable = client.subscribe<
      VideoSubscription,
      VideoSubscriptionVariables
    >({
      query: VIDEOS_PUSHED,
      variables: { channel }
    })

    const subscription = subscriptionObservable.subscribe({
      // REFACTOR NOTE, CHANGED THIS
      next: ({ data }) => {
        const channelState = channelController.readTracksFromCache()

        switch (data.trackUpdated.state) {
          case TrackState.remove:
            {
              if (channelState.channel.nowPlaying.id === data.trackUpdated.id) {
                channelController.nextTrack()
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

        channelController.writeTracksToCache(channelState)
      },
      error(err) {
        console.error(`Finished with error: ${err}`)
      },
      complete() {
        console.info('Finished subscription to', channel)
      }
    })

    return () => {
      if (subscription) subscription.unsubscribe()

      if (playerSubscription) playerSubscription.unsubscribe()
    }
    // todo; test this case out when a users phone is not active  window.onfocus = event => this.render()
  }, [])

  const { data, error, loading } = useQuery<
    UpComingTracksGQL,
    UpComingTracksGQLVariables
  >(UPCOMING_QUERY, {
    variables: { channel }
  })

  if (loading) return { loading: true }

  if (error) return { loading: false, error }

  const { edges } = data.channel.tracks

  return {
    replaceNowPlaying: channelController.replaceNowPlaying,
    nowPlaying: data.channel.nowPlaying,
    error,
    upComing: edges,
    loading: false,
    nextTrack: channelController.nextTrack,
    owner: data.channel.owner
  }
}

export default useChannel
