import * as React from 'react'
import Router from 'next/router'
import { GoogleLogin } from 'react-google-login'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { setCookie } from '../lib/util/cookie'
import LoggedInUserConsumer from '../lib/components/LoggedInUserConsumer'
import Login from '../lib/components/Login'
import Tags from '../lib/components/pages/Tags'

type props = {}

type state = {}


export default class Index extends React.Component<props, state> {
  render() {

    return <>
      <div>AAaaaRQQQQQQ</div>
      <LoggedInUserConsumer>{({ loading, isLoggedIn, user }) => {
        if (loading) {
          return <div>Loading</div>
        }
        else if (isLoggedIn) {
          return <Tags/>
        }
        else {
          return <Login/>
        }
      }}
      </LoggedInUserConsumer>
    </>
  }
}


