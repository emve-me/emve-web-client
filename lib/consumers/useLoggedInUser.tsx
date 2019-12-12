import React from 'react'
import { Query, useQuery } from 'react-apollo'
import { deleteCookie } from 'vanilla-cookies'
import gql from 'graphql-tag'
import {
  GetLoggedInUser,
  GetLoggedInUser_loggedInUser
} from '../../gql_types/GetLoggedInUser'

export const LOGGED_IN_USER_FRAGMENT = gql`
  fragment LoggedInUserFields on User {
    fullName
    firstName
    lastName
    googleId
    id
    picture
  }
`

export const LOGGED_IN_USER = gql`
  query GetLoggedInUser {
    loggedInUser {
      ...LoggedInUserFields
    }
  }
  ${LOGGED_IN_USER_FRAGMENT}
`

type TReturn = {
  loading: boolean
  user?: any
  loggedIn: boolean
  error?: string
}

export const logout = () => {
  deleteCookie('GTOKENID')
  window.location.href = '/'
}

export const useLoggedInUser = (): TReturn => {
  const { error, loading, data, client } = useQuery<GetLoggedInUser>(
    LOGGED_IN_USER
  )

  if (error) {
    console.error(error)
    deleteCookie('GTOKENID')
    return {
      error: 'Error logging in, please refresh',
      loading: false,
      loggedIn: false
    }
  }

  if (loading) {
    return {
      loading: true,
      loggedIn: false
    }
  }

  if (!data.loggedInUser) {
    return {
      loading: false,
      loggedIn: false
    }
  }

  return {
    loading: false,
    user: data.loggedInUser,
    loggedIn: true
  }
}
