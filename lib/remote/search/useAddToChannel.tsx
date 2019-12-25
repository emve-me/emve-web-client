import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation, useMutation } from 'react-apollo'
import { addVideo, addVideoVariables } from '../../../gql_types/addVideo'
import { YouTubeSearch_YoutubeApi_search_list_items } from '../../../gql_types/YouTubeSearch'
import { TRAK_FRAG, UPCOMING_QUERY } from '../../consumers/useChannel'
import { ExecutionResult } from 'apollo-link'

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

export const useAddToChannel = (channel: string): TReturn => {
  const [addVideo, { data, called, loading, client }] = useMutation<
    addVideo,
    addVideoVariables
  >(ADD_VIDEO)

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
