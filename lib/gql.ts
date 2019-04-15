import { gql } from 'apollo-boost'

export const LOGGED_IN_USER = gql`query LoggedInUser {
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
