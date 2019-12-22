import React, { Component, createRef, useEffect } from 'react'
import ChannelConsumer from '../consumers/useChannel'
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
import useChannel from '../consumers/useChannel'

const GQL_PLAYER_CONTROLS = gql`
  subscription PlayerControls($channel: ID!) {
    playerControl(input: { channel: $channel }) {
      action
    }
  }
`

type TSkipTrack = () => void

// todo move mark as played to channel consumer
const PlayerMain: React.FC<{ channel: string }> = ({ channel }) => {
  let _skipTrack: null | TSkipTrack = null

  const client = useApolloClient()

  useEffect(() => {
    const subscriptionObservable = client.subscribe<
      PlayerControls,
      PlayerControlsVariables
    >({
      query: GQL_PLAYER_CONTROLS,
      variables: {
        channel
      }
    })

    const subscription = subscriptionObservable.subscribe({
      next: ({ data }) => {
        switch (data.playerControl.action) {
          case PlayerControlAction.SKIP:
            console.log('called SKUP', _skipTrack)
            if (_skipTrack) {
              _skipTrack()
            }
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
  }, [])

  const { nowPlaying, nextTrack, loading, upComing } = useChannel({
    channel
  })

  // _playerTarget
  //
  // onPlayerReady = ({ target }) => {
  //   this._playerTarget = target
  // }

  _skipTrack = null

  if (loading) {
    return <LoadingIndicator />
  }

  if (upComing.length === 0 && !nowPlaying) {
    return <PlayerEmptyState channel={channel} />
  }

  _skipTrack = nextTrack

  console.log({ nowPlaying })
  if (!nowPlaying) {
    return <div>NO NOW PLAYING</div>
  }

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

export default PlayerMain
