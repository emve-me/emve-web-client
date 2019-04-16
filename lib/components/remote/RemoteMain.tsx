import React, { Component } from 'react'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { SearchResult } from './SearchResult'
import { Search, SearchVariables } from './__generated__/Search'


const SEARCH_QUERY = gql`
  query Search($q: String) {
    YoutubeApi(key: "AIzaSyDtlCouvXU0kcAKF-UZWVNe3sQpoxHBsa0") {
      search {
        list(q: $q, part: "snippet") {
          items {
            id {
              videoId
            }
            snippet {
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

class SearchQuery extends Query<Search, SearchVariables> {

}

type data = {}

type params = {}

class YouTubeSearch extends Query<data, params> {
}

type STATE = { search: string }

type PROPS = {}




class RemoteMain extends Component<PROPS, STATE> {
  constructor(props) {
    super(props)
    this.state = { search: '' }
  }

  render() {
    return (
      <div>
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
          <input
            style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: 40
            }}
            autoFocus={true}
            placeholder="Search"
            onChange={e => this.setState({ search: e.target.value })}
            type="text"
          />
        </div>


        <div style={{ paddingTop: '6rem', maxWidth: 550, margin: '0 auto' }}>

          {/*<SubscriptionTest/>*/}
          <SearchQuery query={SEARCH_QUERY} variables={{ q: this.state.search }}>
            {({ loading, error, data }) => {

              if (loading) {
                return <div>Loading</div>
              }

              if (error) {
                console.error(error)
                return <div>Error</div>
              }

              return data.YoutubeApi.search.list.items.map(element => (
                <SearchResult item={element} key={element.id.videoId}/>
              ))
            }}
          </SearchQuery>
        </div>
      </div>
    )
  }
}

export default RemoteMain
