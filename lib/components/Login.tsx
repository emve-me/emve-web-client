import { GoogleLogin } from 'react-google-login'
import { setCookie } from '../util/cookie'
import { Mutation } from 'react-apollo'
import * as React from 'react'
import gql from 'graphql-tag'
import { GQL_LOGGED_IN_FRAGMENT, GQL_USER_FRAGMENT } from './gqlFragments'
import { QUERY_LOGGED_IN_USER } from './LoggedInUserConsumer'

const MUTATION_AUTHENTICATE_USER = gql`
    mutation authenticateGoogle($idToken: ID){
        authentication{
            exchangeSessionToken(googleIdToken: $idToken){
                ... AuthResponseFrag
            }
        }
    }
${GQL_LOGGED_IN_FRAGMENT}`

type props = {}
type state = {}

export default class Login extends React.Component<props, state> {


  render() {
    return <Mutation mutation={MUTATION_AUTHENTICATE_USER}>
      {(login, { data, loading, called, error, client }) => (
        <GoogleLogin
          onSuccess={async response => {
            const { profileObj, tokenId } = response as any
            const loginResp = await login({ variables: { idToken: tokenId, appId: 'admin' } })
            const { user, token, id } = loginResp.data.authentication.exchangeSessionToken
            setCookie('COLLAB_SESSION', token, 365)

          }}
          onFailure={(err) => {
            console.error((err))
          }}
          clientId="1066657144492-gjcrv2nk0eghepj8mma7la5tbt0n6k22.apps.googleusercontent.com"
        />)}
    </Mutation>
  }
}