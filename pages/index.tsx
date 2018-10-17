import * as React from 'react'
import Router from 'next/router'
import { GoogleLogin } from 'react-google-login'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { setCookie } from '../lib/util/cookie'

type props = {}

type state = {}


const QQQQ = gql`
    mutation authenticateGoogle($idToken:String!){
        authentication{
            google(idToken: $idToken){
                name
                id
                email
            }
        }
    }

`



export default class Index extends React.Component<props, state> {
  render() {

    return <div>
      <Mutation mutation={QQQQ}>
        {(login, { data, loading, called, error }) => (
          <GoogleLogin
            onSuccess={async response => {
              console.log('response', response)
              const { profileObj, tokenId } = response as any
              console.log('token id', tokenId)
              const xxxxx = await login({ variables: { idToken: tokenId } })
              console.log('XY', xxxxx)
            }}
            onFailure={(err) => {
              console.error((err))
            }}
            clientId="1066657144492-gjcrv2nk0eghepj8mma7la5tbt0n6k22.apps.googleusercontent.com"
          />)}
      </Mutation>
    </div>
  }
}


