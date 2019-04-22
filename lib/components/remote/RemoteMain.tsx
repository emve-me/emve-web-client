import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { SearchResult } from './SearchResult'
import { withRouter, WithRouterProps } from 'next/router'
import { YouTubeSearch, YouTubeSearchVariables } from '../../../gql_types/YouTubeSearch'

// TODO remove key from here
const SEARCH_QUERY = gql`
  query YouTubeSearch($q: String) {
    YoutubeApi(key: "AIzaSyDtlCouvXU0kcAKF-UZWVNe3sQpoxHBsa0") {
      search {
        list(q: $q, part: "snippet", type:"video", videoEmbeddable: TRUE) {
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

class YouTubeSearchQuery extends Query<YouTubeSearch, YouTubeSearchVariables> {
}

type TState = { search: string }

type TProps = {}

class RemoteMain extends Component<TProps & WithRouterProps<{ p: string; }>, TState> {

  constructor(props) {
    super(props)
    this.state = { search: '' }
  }

  render() {

    const channel = this.props.router.query.p

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
          <YouTubeSearchQuery query={SEARCH_QUERY} variables={{ q: this.state.search }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <div>Loading</div>
              }

              if (error) {
                console.error(error)
                return <div>Error</div>
              }

              return data.YoutubeApi.search.list.items.map(element => (
                <SearchResult channel={channel} item={element} key={element.id.videoId}/>
              ))
            }}
          </YouTubeSearchQuery>
        </div>
      </div>
    )
  }
}

export default withRouter(RemoteMain)
