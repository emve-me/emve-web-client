/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TrackState } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: VideoSubscription
// ====================================================

export interface VideoSubscription_trackUpdated {
  __typename: "Track";
  id: string | null;
  title: string | null;
  videoId: string | null;
  state: TrackState | null;
}

export interface VideoSubscription {
  trackUpdated: VideoSubscription_trackUpdated | null;
}

export interface VideoSubscriptionVariables {
  channel: string;
}
