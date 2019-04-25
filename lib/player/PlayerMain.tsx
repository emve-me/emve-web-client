import React, { Component } from 'react'
import { withRouter, WithRouterProps } from 'next/router'
import ChannelConsumer from '../consumers/ChannelController'
import YouTube from 'react-youtube'
import { MarkAsPlayedGQL, MarkAsPlayedGQLVariables } from '../../gql_types/MarkAsPlayedGQL'
import { UpComingTracksGQL, UpComingTracksGQLVariables } from '../../gql_types/UpComingTracksGQL'
import gql from 'graphql-tag'
import LoadingIndicator from '../ui/LoadingIndicator'
import PlayerEmptyState from './PlayerEmptyState'

const GQL_MARK_AS_PLAYED = gql`mutation MarkAsPlayedGQL ($track : ID!, $nextTrack: ID) {
  markTrackAsPlayed(input:{track: $track,nextTrack :$nextTrack})
}`

export default class PlayerMain extends Component <{ channel: string }, {}> {

  render() {

    const { channel } = this.props

    return <ChannelConsumer
      channel={channel}>{({ error, nowPlaying, replaceNowPlaying, loading, upComing, updateCache, client }) => {

      if (loading) {
        return <LoadingIndicator/>
      }

      if (upComing.length === 0 && !nowPlaying) {
        return <PlayerEmptyState channel={channel}/>

      } else {

        return <>
          <YouTube
            videoId={nowPlaying.videoId}
            opts={{
              height: '100vh',
              width: '100vw',
              playerVars: {
                autoplay: 1
              }
            }}
            onEnd={async () => {
              if (upComing.length > 0) {
                replaceNowPlaying(upComing[0].node)

                client.mutate<MarkAsPlayedGQL, MarkAsPlayedGQLVariables>({
                  mutation: GQL_MARK_AS_PLAYED,
                  variables: { track: nowPlaying.id, nextTrack: upComing[0].node.id }
                })
              } else {
                replaceNowPlaying(null)

                client.mutate<MarkAsPlayedGQL, MarkAsPlayedGQLVariables>({
                  mutation: GQL_MARK_AS_PLAYED,
                  variables: { track: nowPlaying.id }
                })
              }
            }}
          />
        </>

      }

    }}</ChannelConsumer>
  }
}

