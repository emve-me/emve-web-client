Now on GitLab!
{
      (client) => {


        const frag = client.cache.readFragment({ fragment: LOGGED_IN_USER_FRAG, id: 'User:LoggedInUser' })

        console.log('read', frag)

        return <div></div>
      }
    }
  </Query>

  return <Query query={SEARCH_QUERY} variables={{ q: 'DOG'}}>
  {({ loading, error, data ,client}) => {

  console.log('client', client)

  if (loading) {
  return <div>Loading</div>
  }

  data.YoutubeApi.search.list.items.map(element =>
  console.log(element.id.videoId)
  )
  return data.YoutubeApi.search.list.items.map(element => (
  <div key={element.id.videoId} > sr {JSON.stringify(element)}</div>
  ))
  }}
  </Query>


  {/*<LoggedInUserConsumer>{({ user }) => user ? <div>Logged in {JSON.stringify(user)} </div> :*/}
  {/*  <GoogleLogin*/}
  {/*    onSuccess={async response => {*/}
  {/*      const { profileObj, tokenId } = response as any*/}
  {/*      console.log(tokenId)*/}


  {/*      setCookie('GTOKENID', tokenId, 365)*/}
  {/*      // const loginResp = await login({ variables: { idToken: tokenId, appId: 'admin' } })*/}
  {/*      // const { user, token, id } = loginResp.data.authentication.exchangeSessionToken*/}
  {/*      // setCookie('COLLAB_SESSION', token, 365)*/}
  {/*    }}*/}
  {/*    onFailure={err => {*/}
  {/*      console.error(err)*/}
  {/*    }}*/}
  {/*    clientId="1066657144492-gjcrv2nk0eghepj8mma7la5tbt0n6k22.apps.googleusercontent.com"*/}
  {/*  />}*/}
  {/*</LoggedInUserConsumer>*/}
