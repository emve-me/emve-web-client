import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import GoogleLogin from 'react-google-login'
import { setCookie } from 'vanilla-cookies'
import gql from 'graphql-tag'
import getConfig from 'next/config'
import { Authenticate } from '../../gql_types/Authenticate'
import { GetLoggedInUser } from '../../gql_types/GetLoggedInUser'
import {
  LOGGED_IN_USER,
  LOGGED_IN_USER_FRAGMENT
} from '../consumers/useLoggedInUser'

const { oAuthClientId } = getConfig().publicRuntimeConfig

const GQL_AUTHENTICATE = gql`
  mutation Authenticate {
    authenticate {
      ...LoggedInUserFields
    }
  }
  ${LOGGED_IN_USER_FRAGMENT}
`

export default class Login extends Component<{}, {}> {
  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <GoogleLogin
              onSuccess={async response => {
                const { profileObj, tokenId } = response as any

                setCookie('GTOKENID', tokenId, 365)

                const newUser = await client.mutate<Authenticate>({
                  mutation: GQL_AUTHENTICATE
                })

                client.writeQuery<GetLoggedInUser>({
                  query: LOGGED_IN_USER,
                  data: { loggedInUser: newUser.data.authenticate }
                })
              }}
              onFailure={err => {
                console.error(err)
              }}
              clientId={oAuthClientId}
            />
          )
        }}
      </ApolloConsumer>
    )
  }
}
