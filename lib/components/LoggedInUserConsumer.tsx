import React, { Component } from 'react'
import ApolloConsumer from 'react-apollo/ApolloConsumer'
import { gql } from 'apollo-boost'

type TProps = {
  children: ({ user }) => React.ReactNode
}

const LOGGED_IN_USER_FRAG= gql`fragment LoggedInUser on User {
    azp
    aud
    sub
    email
    email_verified
    at_hash
    name
    picture
    given_name
    family_name
    locale
    iat
    exp
    jti
  }
`

export default class LoggedInUserConsumer extends Component <TProps> {
  render() {
    return <ApolloConsumer>
      {(client) => {
        const frag = client.cache.readFragment({ fragment:LOGGED_IN_USER_FRAG, id:'User:LoggedInUser'})

        console.log('read', frag)

        return <div></div>
      }}
      </ApolloConsumer>

  }
}