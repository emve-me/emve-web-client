import React, { Component } from 'react'
import { YouTubeSearch_YoutubeApi_search_list_items } from '../../../gql_types/YouTubeSearch'
import { useAddToChannel } from './useAddToChannel'
import { SearchResultTrack } from '../Track'

type TProps = {
  item: YouTubeSearch_YoutubeApi_search_list_items
  channel: string
  onSelect: (item: YouTubeSearch_YoutubeApi_search_list_items) => void
}

export const SearchResult: React.FC<TProps> = ({ item, channel, onSelect }) => {
  const addVideo = useAddToChannel(channel)

  return (
    <SearchResultTrack
      onClick={() => {
        addVideo(item)
        onSelect(item)
      }}
      title={item.snippet.title}
      thumb={item.snippet.thumbnails.high.url}
    />
  )
}
