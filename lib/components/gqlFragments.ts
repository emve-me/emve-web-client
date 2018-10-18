import gql from 'graphql-tag'

const GQL_USER_FRAGMENT = gql`
    fragment LoggedInUserFrag on User{
        firstName
        lastName
        id
    }`


const GQL_LOGGED_IN_FRAGMENT = gql`
    fragment AuthResponseFrag on AuthResponse {
        user{
            ... LoggedInUserFrag
        }
        token
        id
    }
${GQL_USER_FRAGMENT}`


export { GQL_USER_FRAGMENT, GQL_LOGGED_IN_FRAGMENT }