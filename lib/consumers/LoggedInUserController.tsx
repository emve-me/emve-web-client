import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { LOGGED_IN_USER } from '../gql'


type TProps = {
  children: ({ user, loggedIn }: { user?: TJWT, loggedIn: boolean }) => React.ReactNode
}


export default class LoggedInUserController extends Component <TProps> {
  render() {
    return <Query query={LOGGED_IN_USER} variables={{ id: 'LoggedInUser' }}
                  fetchPolicy='cache-only'>{({ error, loading, data, client }) => {

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

      return this.props.children({ user: data.loggedInUser, loggedIn: true })
    }}
    </Query>

  }
}
