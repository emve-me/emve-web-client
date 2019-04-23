import React, { Component } from 'react'
import { withRouter, WithRouterProps } from 'next/router'
import ChannelConsumer from '../consumers/ChannelConsumer'
import YouTube from 'react-youtube'
import { MarkAsPlayedGQL, MarkAsPlayedGQLVariables } from '../../../gql_types/MarkAsPlayedGQL'
import { UpComingTracksGQL, UpComingTracksGQLVariables } from '../../../gql_types/UpComingTracksGQL'
import gql from 'graphql-tag'

const GQL_MARK_AS_PLAYED = gql`mutation MarkAsPlayedGQL ($track : ID!) {
  markTrackAsPlayed(track: $track)
}`

class PlayerMain extends Component <WithRouterProps<{ p: string; }>, {}> {

  render() {

    const { p: channel } = this.props.router.query

    return <ChannelConsumer channel={channel}>{({ error, nowPlaying, loading, upComing, updateCache, client }) => {

      if (loading) {
        return 'Loading'
      }

      if (upComing.length === 0) {
        return <div>EMTPY STATE</div>
      } else {

        const nowPlaying = upComing[0]
        const videoId = nowPlaying.node.videoId

        return <>
          {nowPlaying ? <div>{nowPlaying.node.title}</div> : false}
          {upComing.map(({ node }) => <div style={{ border: 'solid 1px #eee', padding: 4 }}
                                           key={node.id}>{node.title}</div>)}
          <YouTube
            videoId={videoId}
            opts={{
              height: '390',
              width: '640',
              playerVars: {
                autoplay: 1
              }
            }}
            onPlay={async () => {
              // TODO ON SERVER KEEP TRACK OF CURRENTLY PLAYING TRACK IN CHANNEL
              client.mutate<MarkAsPlayedGQL, MarkAsPlayedGQLVariables>({
                mutation: GQL_MARK_AS_PLAYED,
                variables: { track: nowPlaying.node.id }
              })
            }}
            onEnd={async () => {
              updateCache((currentState) => {
                  currentState.channel.tracks.edges = currentState.channel.tracks.edges.filter(({ node }) => node.id !== nowPlaying.node.id)
                  return currentState
                }
              )
            }}
          /></>

      }

    }}</ChannelConsumer>
  }
}

export default withRouter(PlayerMain)