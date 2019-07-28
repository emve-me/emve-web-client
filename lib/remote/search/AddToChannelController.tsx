import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { addVideo, addVideoVariables } from '../../../gql_types/addVideo'
import { YouTubeSearch_YoutubeApi_search_list_items } from '../../../gql_types/YouTubeSearch'
import { TRAK_FRAG } from '../../consumers/ChannelController'

const ADD_VIDEO = gql`
  mutation addVideo($videoId: ID!, $channel: ID!, $title: String) {
    videoPush(input: { videoId: $videoId, channel: $channel, title: $title }) {
      ...TrackOnChannel
    }
  }
  ${TRAK_FRAG}
`

class AddVideoMutation extends Mutation<addVideo, addVideoVariables> {}

type TRenderProps = {
  addVideo: () => Promise<void>
}

type TProps = {
  item: YouTubeSearch_YoutubeApi_search_list_items
  channel: string
  children: ({ addVideo }: TRenderProps) => React.ReactNode
}

export class AddToChannelController extends Component<TProps> {
  render() {
    const { item, channel, children } = this.props

    return (
      <AddVideoMutation mutation={ADD_VIDEO}>
        {(addVideo, { data, called, loading }) => {
          return this.props.children({
            addVideo: async () => {
              console.log('ADD VIDEO')
              const addVideoResp = await addVideo({
                variables: {
                  videoId: item.id.videoId,
                  channel,
                  title: item.snippet.title
                }
              })
              console.log('ADD VIDEO RESP', addVideoResp)
            }
          })
        }}
      </AddVideoMutation>
    )
  }
}
