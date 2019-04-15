import React, { Component } from 'react'
import { ApolloConsumer, Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import GoogleLogin from 'react-google-login'
import { setCookie } from '../util/cookie'
import { QQ } from './withApollo'
import jwtIO from 'jsonwebtoken'


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
type data = {}

type params = {}

class YouTubeSearch extends Query<data, params> {
}


export default class Login extends Component<{}, {}> {
  render() {


    return <>


      <ApolloConsumer>{client => {
        return <GoogleLogin
          onSuccess={async response => {
            const { profileObj, tokenId } = response as any

            const loggedInUser = { ...(jwtIO.decode(tokenId) as any), id: 'LoggedInUser', __typename: 'User' }

            setCookie('GTOKENID', tokenId, 365)

            client.writeQuery({
              query: QQ,
              data: { loggedInUser }
            })
          }}

          onFailure={err => {
            console.error(err)
          }}

          clientId="1066657144492-gjcrv2nk0eghepj8mma7la5tbt0n6k22.apps.googleusercontent.com"
        />

      }}</ApolloConsumer>

    </>
  }
}


