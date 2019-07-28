import React, { Component } from 'react'
import { YouTubeSearch_YoutubeApi_search_list_items } from '../../../gql_types/YouTubeSearch'
import { AddToChannelController } from './AddToChannelController'
import { SearchResultTrack } from '../Track'

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
            <SearchResultTrack
              onClick={() => {
                addVideo()
                onSelect(item)
              }}
              title={item.snippet.title}
              thumb={item.snippet.thumbnails.high.url}
            />
          </>
        )}
      </AddToChannelController>
    )
  }
}
