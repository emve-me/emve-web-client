import * as React from 'react'
import Router from 'next/router'
import { GoogleLogin } from 'react-google-login'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

type props = {}

type state = {}

export default class Index extends React.Component<props, state> {
  render() {
    return <div>HELLO</div>


  }
}


