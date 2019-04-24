import React, { Component } from 'react'
import { withRouter, WithRouterProps } from 'next/router'
import ChannelConsumer from '../consumers/ChannelConsumer'
import YouTube from 'react-youtube'
import { MarkAsPlayedGQL, MarkAsPlayedGQLVariables } from '../../gql_types/MarkAsPlayedGQL'
import { UpComingTracksGQL, UpComingTracksGQLVariables } from '../../gql_types/UpComingTracksGQL'
import gql from 'graphql-tag'

const GQL_MARK_AS_PLAYED = gql`mutation MarkAsPlayedGQL ($track : ID!, $nextTrack: ID) {
  markTrackAsPlayed(input:{track: $track,nextTrack :$nextTrack})
}`

class PlayerMain extends Component <WithRouterProps<{ p: string; }>, {}> {

  render() {

    const { p: channel } = this.props.router.query

    return <ChannelConsumer
      channel={channel}>{({ error, nowPlaying, replaceNowPlaying, loading, upComing, updateCache, client }) => {

      if (loading) {
        return 'Loading'
      }

      if (upComing.length === 0 && !nowPlaying) {
        return <div>EMTPY STATE</div>
      } else {


        return <>
          <div>Now Playing:
            {nowPlaying ? <div>{nowPlaying.title}</div> : false}</div>

          <div>Up comming:
            {upComing.map(({ node }) => <div style={{ border: 'solid 1px #eee', padding: 4 }}
                                             key={node.id}>{node.title}</div>)}</div>

          <YouTube
            videoId={nowPlaying.videoId}
            opts={{
              height: '390',
              width: '640',
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

export default withRouter(PlayerMain)