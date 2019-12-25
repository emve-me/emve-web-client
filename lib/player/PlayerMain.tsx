import React from 'react'
import YouTube from 'react-youtube'
import LoadingIndicator from '../ui/LoadingIndicator'
import { PlayerEmptyState } from './PlayerEmptyState'
import { useApolloClient, withApollo, WithApolloClient } from 'react-apollo'
import UpNext from './UpNext'
import useChannel from '../consumers/useChannel'

type TSkipTrack = () => void

// todo move mark as played to channel consumer
const PlayerMain: React.FC<{ channel: string }> = ({ channel }) => {
  let _skipTrack: null | TSkipTrack = null

  const client = useApolloClient()

  const { nowPlaying, nextTrack, loading, upComing } = useChannel({
    channel,
    onPlayer: true
  })

  if (loading) {
    return <LoadingIndicator />
  }

  if (upComing.length === 0 && !nowPlaying) {
    return <PlayerEmptyState nothingPlaying={false} channel={channel} />
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

      {/*Show the logo in the top left?*/}
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
