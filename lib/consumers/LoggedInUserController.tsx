import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { deleteCookie } from 'vanilla-cookies'
import gql from 'graphql-tag'
import {
  GetLoggedInUser,
  GetLoggedInUser_loggedInUser
} from '../../gql_types/GetLoggedInUser'

type TProps = {
  children: ({
    user,
    loggedIn,
    logout
  }: {
    logout?: () => void
    user?: GetLoggedInUser_loggedInUser
    loggedIn: boolean
  }) => React.ReactNode
}

export const LOGGED_IN_USER_FRAGMENT = gql`
  fragment LoggedInUserFields on User {
    fullName
    firstName
    lastName
    googleId
    id
    picture
  }
`

export const LOGGED_IN_USER = gql`
  query GetLoggedInUser {
    loggedInUser {
      ...LoggedInUserFields
    }
  }
  ${LOGGED_IN_USER_FRAGMENT}
`

class GetLoggedInUserQuery extends Query<GetLoggedInUser> {}

export default class LoggedInUserController extends Component<TProps> {
  render() {
    return (
      <GetLoggedInUserQuery query={LOGGED_IN_USER}>
        {({ error, loading, data, client }) => {
          if (error) {
            console.error(error)
            return <div>Error Logging In</div>
          }

          if (loading) {
            return <div>Loading ...</div>
          }

          if (!data.loggedInUser) {
            return this.props.children({ loggedIn: false })
          }

          const logout = () => {
            deleteCookie('GTOKENID')
            window.location.href = '/'
          }

          return this.props.children({
            user: data.loggedInUser,
            loggedIn: true,
            logout
          })
        }}
      </GetLoggedInUserQuery>
    )
  }
}
