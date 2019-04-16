import gql  from 'graphql-tag'

export const LOGGED_IN_USER = gql`query LoggedInUser @client {
  loggedInUser {
    iss
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
    id
    __typename
  }
}`
