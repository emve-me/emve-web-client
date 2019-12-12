import LoadingIndicator from '../../ui/LoadingIndicator'
import { SearchResult } from './SearchResult'
import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import {
  YouTubeSearch,
  YouTubeSearch_YoutubeApi_search_list_items,
  YouTubeSearchVariables
} from '../../../gql_types/YouTubeSearch'
import Card from '../Card'
import getConfig from 'next/config'

const { youtubeSearchKey } = getConfig().publicRuntimeConfig

const SEARCH_QUERY = gql`
  query YouTubeSearch($q: String) {
    YoutubeApi(key: "${youtubeSearchKey}") {
      search {
        list(
          q: $q
          part: "snippet"
          type: "video"
          videoEmbeddable: TRUE
          maxResults: 8
        ) {
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

type TProps = {
  channel: string
  search: string
  onSelect: (item: YouTubeSearch_YoutubeApi_search_list_items) => void
}

export default ({ channel, search, onSelect }: TProps) =>
  !search ? null : (
    <Query<YouTubeSearch, YouTubeSearchVariables>
      query={SEARCH_QUERY}
      variables={{ q: search }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <LoadingIndicator />
        }

        if (error) {
          console.error(error)
          return <div>Error</div>
        }

        const results = data.YoutubeApi.search.list.items.filter(
          video => video.snippet.liveBroadcastContent === 'none'
        )

        if (results.length === 0) {
          return (
            <div style={{ padding: 16, textAlign: 'center' }}>
              No results! Please refine search
            </div>
          )
        }

        return (
          <Card>
            {results.map(element => (
              <SearchResult
                onSelect={onSelect}
                channel={channel}
                item={element}
                key={element.id.videoId}
              />
            ))}
          </Card>
        )
      }}
    </Query>
  )
