import React, { Component } from 'react'
import { ApolloConsumer, Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import GoogleLogin from 'react-google-login'
import { setCookie } from '../util/cookie'
import { QQ } from './withApollo'


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
      <Query query={QQ} variables={{ id: 'LoggedInUser' }}
             fetchPolicy='cache-only'>{({ error, loading, data, client }) => {


        if (error) {
          console.log(error)
          return <div>Error</div>
        }

        if (loading) {
          return <div>Loading</div>
        }
        console.log('cache', client.cache.extract())

        console.log('datra', data)


        return <div>{JSON.stringify(data)}</div>
      }


      }
      </Query>

      <ApolloConsumer>{client => {
        return <GoogleLogin
          onSuccess={async response => {
            const { profileObj, tokenId } = response as any
            console.log(tokenId)


            setCookie('GTOKENID', tokenId, 365)

            client.writeQuery({
              query: QQ,
              data:{ loggedInUser: { id: 'LoggedInUser', email: 'eoeoe', __typename: 'User' } }
            })


            // const loginResp = await login({ variables: { idToken: tokenId, appId: 'admin' } })*/}
            // const { user, token, id } = loginResp.data.authentication.exchangeSessionToken*/}
            // setCookie('COLLAB_SESSION', token, 365)*/}
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


