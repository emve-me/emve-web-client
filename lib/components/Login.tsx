import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import GoogleLogin from 'react-google-login'
import jwtIO from 'jsonwebtoken'
import { LOGGED_IN_USER } from '../gql'
import { setCookie } from 'vanilla-cookies'


type data = {}

type params = {}


export default class Login extends Component<{}, {}> {
  render() {


    return <ApolloConsumer>{client => {
      return <GoogleLogin
        onSuccess={async response => {
          const { profileObj, tokenId } = response as any

          const loggedInUser = { ...(jwtIO.decode(tokenId) as any), id: 'LoggedInUser', __typename: 'User' }

          setCookie('GTOKENID', tokenId, 365)

          client.writeQuery({
            query: LOGGED_IN_USER,
            data: { loggedInUser }
          })
        }}

        onFailure={err => {
          console.error(err)
        }}

        clientId="1066657144492-gjcrv2nk0eghepj8mma7la5tbt0n6k22.apps.googleusercontent.com"
      />

    }}</ApolloConsumer>
  }
}


