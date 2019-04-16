/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: VideoSubscription
// ====================================================

export interface VideoSubscription_videoPushed {
  __typename: "Video";
  /**
   * The ID that YouTube uses to uniquely identify the video.
   */
  id: string | null;
}

export interface VideoSubscription {
  videoPushed: VideoSubscription_videoPushed | null;
}
