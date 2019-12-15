import React, { Component, createRef, useEffect } from 'react'
import ChannelConsumer from '../consumers/useChannelController'
import YouTube from 'react-youtube'
import gql from 'graphql-tag'
import LoadingIndicator from '../ui/LoadingIndicator'
import PlayerEmptyState from './PlayerEmptyState'
import { useApolloClient, withApollo, WithApolloClient } from 'react-apollo'
import {
  PlayerControls,
  PlayerControlsVariables
} from '../../gql_types/PlayerControls'
import {
  MarkAsPlayedGQL,
  MarkAsPlayedGQLVariables
} from '../../gql_types/MarkAsPlayedGQL'
import { PlayerControlAction } from '../../gql_types/globalTypes'
import UpNext from './UpNext'
import HeartIcon from '../icons/HeartIcon'
import useChannelController from '../consumers/useChannelController'

const GQL_MARK_AS_PLAYED = gql`
  mutation MarkAsPlayedGQL($track: ID!, $nextTrack: ID) {
    markTrackAsPlayed(input: { track: $track, nextTrack: $nextTrack })
  }
`

const GQL_PLAYER_CONTROLS = gql`
  subscription PlayerControls($channel: ID!) {
    playerControl(input: { channel: $channel }) {
      action
    }
  }
`

type TProps = { channel: string }

// todo move mark as played to channel consumer
const PlayerMain: React.FC<TProps> = ({ channel }) => {
  const client = useApolloClient()

  useEffect(() => {
    const subscriptionObservable = client.subscribe<
      PlayerControls,
      PlayerControlsVariables
    >({
      query: GQL_PLAYER_CONTROLS,
      variables: { channel }
    })

    const subscription = subscriptionObservable.subscribe({
      // REFACTOR NOTE
      next: ({ data }) => {
        switch (data.playerControl.action) {
          case PlayerControlAction.SKIP:
            // if (this.skipTrack) {
            // this.skipTrack()
            // }
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

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  })

  // _playerTarget
  //
  // onPlayerReady = ({ target }) => {
  //   this._playerTarget = target
  // }

  const {
    error,
    nowPlaying,
    replaceNowPlaying,
    loading,
    upComing
  } = useChannelController({ channel })

  if (loading) {
    return <LoadingIndicator />
  }

  if (upComing.length === 0 && !nowPlaying) {
    return <PlayerEmptyState channel={channel} />
  } else {
    const nextTrack = async () => {
      if (upComing.length > 0) {
        replaceNowPlaying(upComing[0].node)

        client.mutate<MarkAsPlayedGQL, MarkAsPlayedGQLVariables>({
          mutation: GQL_MARK_AS_PLAYED,
          variables: {
            track: nowPlaying.id,
            nextTrack: upComing[0].node.id
          }
        })
      } else {
        replaceNowPlaying(null)

        client.mutate<MarkAsPlayedGQL, MarkAsPlayedGQLVariables>({
          mutation: GQL_MARK_AS_PLAYED,
          variables: { track: nowPlaying.id }
        })
      }
    }

    // this.skipTrack = nextTrack

    return (
      <>
        <style jsx global>
          {`
            .playerContainer {
              position: fixed;
              top: 0;
              bottom: 0;
              right: 0;
              left: 0;
            }
          `}
        </style>

        {/*<HeartIcon style={{position:'fixed', top:32,left:32, zIndex:100}}/>*/}

        <UpNext
          channel={channel}
          nextTrack={upComing.length > 0 ? upComing[0].node : null}
        />
        <YouTube
          // onReady={this.onPlayerReady}
          containerClassName="playerContainer"
          videoId={nowPlaying.videoId}
          opts={{
            height: '100%',
            width: '100%',
            playerVars: {
              autoplay: 1
            }
          }}
          onEnd={nextTrack}
        />
      </>
    )
  }
}

export default PlayerMain
