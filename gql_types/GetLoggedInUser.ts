/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLoggedInUser
// ====================================================

export interface GetLoggedInUser_loggedInUser {
  __typename: 'User'
  fullName: string | null
  firstName: string | null
  lastName: string | null
  googleId: string | null
  id: string | null
  picture: string | null
}

export interface GetLoggedInUser {
  loggedInUser: GetLoggedInUser_loggedInUser | null
}
