import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation, useMutation } from 'react-apollo'
import { addVideo, addVideoVariables } from '../../../gql_types/addVideo'
import { YouTubeSearch_YoutubeApi_search_list_items } from '../../../gql_types/YouTubeSearch'
import { TRAK_FRAG, UPCOMING_QUERY } from '../../consumers/useChannelController'
import { ExecutionResult } from 'apollo-link'
import {
  UpComingTracksGQL,
  UpComingTracksGQLVariables
} from '../../../gql_types/UpComingTracksGQL'

const ADD_VIDEO = gql`
  mutation addVideo($videoId: ID!, $channel: ID!, $title: String) {
    videoPush(input: { videoId: $videoId, channel: $channel, title: $title }) {
      ...TrackOnChannel
    }
  }
  ${TRAK_FRAG}
`

type TReturn = (
  item: YouTubeSearch_YoutubeApi_search_list_items
) => Promise<ExecutionResult<addVideo>>

export const useAddToChannelController = (channel: string): TReturn => {
  const [addVideo, { data, called, loading, client }] = useMutation<
    addVideo,
    addVideoVariables
  >(ADD_VIDEO, {
    update(cache, { data }) {
      const results = client.readQuery<
        UpComingTracksGQL,
        UpComingTracksGQLVariables
      >({
        query: UPCOMING_QUERY,
        variables: { channel: channel }
      })

      const newResults = JSON.parse(JSON.stringify(results))

      newResults.channel.tracks.edges = results.channel.tracks.edges.concat({
        __typename: 'TracksEdge',
        node: data.videoPush
      })

      cache.writeQuery<UpComingTracksGQL, UpComingTracksGQLVariables>({
        query: UPCOMING_QUERY,
        data: newResults,
        variables: { channel }
      })

      console.log('WRITE TO CACHE QUERY', data.videoPush)
    }
  })

  return (item: YouTubeSearch_YoutubeApi_search_list_items) => {
    return addVideo({
      variables: {
        videoId: item.id.videoId,
        channel,
        title: item.snippet.title
      }
    })
  }
}
