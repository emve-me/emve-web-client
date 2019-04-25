import LoadingIndicator from '../../ui/LoadingIndicator'
import { SearchResult } from './SearchResult'
import React from 'react'
import query from 'apollo-cache-inmemory/lib/fragmentMatcherIntrospectionQuery'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import {
  YouTubeSearch,
  YouTubeSearch_YoutubeApi_search_list_items,
  YouTubeSearchVariables
} from '../../../gql_types/YouTubeSearch'


const SEARCH_QUERY = gql`
  query YouTubeSearch($q: String) {
    YoutubeApi(key: "AIzaSyDtlCouvXU0kcAKF-UZWVNe3sQpoxHBsa0") {
      search {
        list(q: $q, part: "snippet", type:"video", videoEmbeddable: TRUE, maxResults: 16) {
          items {
            id {
              videoId
              kind
            }
            snippet {
              liveBroadcastContent
              title
              thumbnails {
                high {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`

class YouTubeSearchQuery extends Query<YouTubeSearch, YouTubeSearchVariables> {
}

type TProps = {
  channel: string
  search: string
  onSelect: (item:YouTubeSearch_YoutubeApi_search_list_items) => void
}

export default ({ channel, search,onSelect}: TProps) => (
  <YouTubeSearchQuery query={SEARCH_QUERY} variables={{ q: search }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <LoadingIndicator/>
      }

      if (error) {
        console.error(error)
        return <div>Error</div>
      }

      return data.YoutubeApi.search.list.items.filter(video => video.snippet.liveBroadcastContent === 'none').map(element => (
        <SearchResult onSelect={onSelect} channel={channel} item={element} key={element.id.videoId}/>
      ))
    }}
  </YouTubeSearchQuery>)

