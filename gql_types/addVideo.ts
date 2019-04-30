/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TrackState } from './globalTypes'

// ====================================================
// GraphQL mutation operation: addVideo
// ====================================================

export interface addVideo_videoPush_owner {
  __typename: 'User'
  id: string | null
  fullName: string | null
  firstName: string | null
  picture: string | null
}

export interface addVideo_videoPush {
  __typename: 'Track'
  id: string | null
  title: string | null
  videoId: string | null
  state: TrackState | null
  thumb: string | null
  owner: addVideo_videoPush_owner | null
}

export interface addVideo {
  videoPush: addVideo_videoPush | null
}

export interface addVideoVariables {
  videoId: string
  channel: string
  title?: string | null
}
