import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { QQ } from './withApollo'

type TProps = {
  children: ({ user, loggedIn }: { user?, loggedIn: boolean }) => React.ReactNode
}

const LOGGED_IN_USER_FRAG = gql`fragment LoggedInUser on User {
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
    return <Query query={QQ} variables={{ id: 'LoggedInUser' }}
                  fetchPolicy='cache-only'>{({ error, loading, data, client }) => {


      if (error) {
        console.log(error)
        return <div>Error</div>
      }

      if (loading) {
        return <div>Loading ...</div>
      }

      if (!data.loggedInUser) {
        return this.props.children({ loggedIn: false })
      }

      return this.props.children({ user: data.loggedInUser, loggedIn: true })
    }
    }
    </Query>

  }
}