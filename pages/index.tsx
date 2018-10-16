import * as React from 'react'
import Router from 'next/router'
import { GoogleLogin } from 'react-google-login'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { setCookie } from '../lib/util/cookie'

type props = {}

type state = {}

const CCCCCC = gql`query getLoggedInUser {
    auth {
        loggedInUser {
            name
            id
        }
    }
}
`

export default class Index extends React.Component<props, state> {
  render() {

    return <div>


      <GoogleLogin
        onSuccess={async response => {
          console.log('response', response)

          const { profileObj, tokenId } = response as any

          console.log('token id', tokenId)
          setCookie('googleJWT', tokenId, 365)

        }}
        onFailure={(err) => {
          console.error((err))
        }}
        clientId="1066657144492-gjcrv2nk0eghepj8mma7la5tbt0n6k22.apps.googleusercontent.com"
      />


      <Query query={CCCCCC} ssr={false}>{
        ({ data, loading }) => {
          if (!loading) {
            console.log(data)
          }

          return <div>Loggggg</div>
        }}
      </Query>


    </div>


  }
}


