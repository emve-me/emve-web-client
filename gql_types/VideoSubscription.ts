/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TrackState } from './globalTypes'

// ====================================================
// GraphQL subscription operation: VideoSubscription
// ====================================================

export interface VideoSubscription_trackUpdated_owner {
  __typename: 'User'
  id: string | null
  fullName: string | null
  firstName: string | null
  picture: string | null
}

export interface VideoSubscription_trackUpdated {
  __typename: 'Track'
  id: string | null
  title: string | null
  videoId: string | null
  state: TrackState | null
  thumb: string | null
  owner: VideoSubscription_trackUpdated_owner | null
}

export interface VideoSubscription {
  trackUpdated: VideoSubscription_trackUpdated | null
}

export interface VideoSubscriptionVariables {
  channel: string
}
