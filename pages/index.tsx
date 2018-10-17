import * as React from 'react'
import Router from 'next/router'
import { GoogleLogin } from 'react-google-login'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { setCookie } from '../lib/util/cookie'

type props = {}

type state = {}

const MUTATION_AUTHENTICATE_USER = gql`
    mutation authenticateGoogle($idToken: ID){
        authentication{
            exchangeSessionToken(googleIdToken: $idToken){
                user{
                    name
                    id
                    email
                }
                token
            }
        }
    }`


const QUERY_LOGGED_IN_USER = gql`
    query getLoggedInUser {
        auth {
            loggedInUser{
                name
                id
                email
            }
        }
    }`

export default class Index extends React.Component<props, state> {
  render() {

    return <>
      <Query query={QUERY_LOGGED_IN_USER}>{({ error, data, loading }) => {

        if (loading) {
          return <div>Loading</div>
        }

        if (error) {
          return <div>Not logged inLogged in!</div>
        }
        else {
          return <div>OHOHOHOHOOHOH</div>
        }
      }}</Query>


      <Mutation mutation={MUTATION_AUTHENTICATE_USER}>
        {(login, { data, loading, called, error }) => (
          <GoogleLogin
            onSuccess={async response => {



              const { profileObj, tokenId } = response as any
              const loginResp = await login({ variables: { idToken: tokenId } })

              const {user, token} = loginResp.data.authentication.exchangeSessionToken

              setCookie('COLLAB_SESSION', token, 365)

              console.log(token)

            }}
            onFailure={(err) => {
              console.error((err))
            }}
            clientId="1066657144492-gjcrv2nk0eghepj8mma7la5tbt0n6k22.apps.googleusercontent.com"
          />)}
      </Mutation>
    </>
  }
}


