import * as React from 'react'
import { GoogleLogin } from 'react-google-login'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { GQL_LOGGED_IN_FRAGMENT, GQL_USER_FRAGMENT } from './gqlFragments'

type funcArgs = {
  user?
  isLoggedIn?: boolean
  loading: boolean
}

type props = { children: (args: funcArgs) => React.ReactNode }

type state = {}


const QUERY_LOGGED_IN_USER = gql`
    query getLoggedInUser {
        loggedIn{
            ... AuthResponseFrag
        }
    }
    ${GQL_LOGGED_IN_FRAGMENT}

`

class LoggedInUserConsumer extends React.Component<props, state> {
  render() {

    return <Query query={QUERY_LOGGED_IN_USER}>
      {({ error, data, loading, client }) => {

        console.log('data', data, 'loading', loading)

        console.log('client', client)

        if (loading) {
          return this.props.children({ loading })
        }
        else {
          const user = data ? data.loggedIn.user : null
          return this.props.children({ loading, user, isLoggedIn: !!user })
        }
      }}</Query>


  }
}

export { QUERY_LOGGED_IN_USER, LoggedInUserConsumer as default }
