import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { addVideo, addVideoVariables } from '../../../gql_types/addVideo'
import { YouTubeSearch_YoutubeApi_search_list_items } from '../../../gql_types/YouTubeSearch'
import { TRAK_FRAG } from '../../consumers/ChannelController'
import { AddToChannelController } from './AddToChannelController'


type TProps = {
  item: YouTubeSearch_YoutubeApi_search_list_items
  channel: string
  onSelect: (item: YouTubeSearch_YoutubeApi_search_list_items) => void
}

export class SearchResult extends Component<TProps> {
  render() {
    const { item, channel, onSelect } = this.props

    return (
      <AddToChannelController item={item} channel={channel}>
        {({ addVideo }) => (
          <>
            <div
              onClick={() => {
                addVideo()
                onSelect(item)

              }}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', width: 480 }}>

              <div style={{
                paddingBottom: '.5rem',
                textAlign: 'center',
                fontSize: '1.2rem'
              }} dangerouslySetInnerHTML={{ __html: item.snippet.title }}/>
              <img style={{ borderRadius: 6 }} src={item.snippet.thumbnails.high.url}/>
            </div>
            <div style={{ height: 36 }}/>
          </>
        )}
      </AddToChannelController>
    )
  }
}
