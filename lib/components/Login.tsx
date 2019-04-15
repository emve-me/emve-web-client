import { GoogleLogin } from 'react-google-login'
import React, { Component } from 'react'
import { setCookie } from '../util/cookie'


export default class Login extends Component<{}, {}> {
  render() {
    return (
      <GoogleLogin
        onSuccess={async response => {
          const { profileObj, tokenId } = response as any
          console.log(tokenId)


          setCookie('GTOKENID', tokenId, 365)
          // const loginResp = await login({ variables: { idToken: tokenId, appId: 'admin' } })
          // const { user, token, id } = loginResp.data.authentication.exchangeSessionToken
          // setCookie('COLLAB_SESSION', token, 365)
        }}
        onFailure={err => {
          console.error(err)
        }}
        clientId="1066657144492-gjcrv2nk0eghepj8mma7la5tbt0n6k22.apps.googleusercontent.com"
      />
    )
  }
}
