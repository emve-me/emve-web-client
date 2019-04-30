/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TrackState } from './globalTypes'

// ====================================================
// GraphQL fragment: TrackOnChannel
// ====================================================

export interface TrackOnChannel_owner {
  __typename: 'User'
  id: string | null
  fullName: string | null
  firstName: string | null
  picture: string | null
}

export interface TrackOnChannel {
  __typename: 'Track'
  id: string | null
  title: string | null
  videoId: string | null
  state: TrackState | null
  thumb: string | null
  owner: TrackOnChannel_owner | null
}
