import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { addVideo, addVideoVariables } from '../../../gql_types/addVideo'
import { YouTubeSearch_YoutubeApi_search_list_items } from '../../../gql_types/YouTubeSearch'
import { TRAK_FRAG } from '../consumers/UpComingItemsConsumer'

const ADD_VIDEO = gql`
  mutation addVideo($videoId: ID!, $channel: ID!, $title : String) {
    videoPush(input: { videoId: $videoId, channel: $channel, title: $title}) {
      ... TrackOnChannel
    }
  }
${TRAK_FRAG}`

class AddVideoMutation extends Mutation<addVideo, addVideoVariables> {

}

type PROPS = {
  item: YouTubeSearch_YoutubeApi_search_list_items
  channel: string
}

type STATE = {}

export class SearchResult extends Component<PROPS, STATE> {
  render() {
    const { item, channel } = this.props

    return (
      <AddVideoMutation mutation={ADD_VIDEO}>
        {(addVideo, { data }) => (
          <div
            onClick={async () => {
              const addVideoResp = await addVideo({
                variables: {
                  videoId: item.id.videoId,
                  channel,
                  title: item.snippet.title
                }
              })
              console.log('resp', addVideoResp)
            }}
            style={{ cursor: 'pointer', padding: '1rem' }}>
            {item.id.videoId}
            <div
              style={{
                fontFamily: 'arial',
                paddingBottom: '.5rem',
                textAlign: 'center',
                fontSize: '1.2rem'
              }}>
              <div dangerouslySetInnerHTML={{ __html: item.snippet.title }}/>
            </div>
            <img style={{ width: '100%', borderRadius: 5 }} src={item.snippet.thumbnails.high.url}/>
          </div>
        )}
      </AddVideoMutation>
    )
  }
}
