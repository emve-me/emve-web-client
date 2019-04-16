/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: Videos
// ====================================================

export interface Videos_videoPushed {
  __typename: "Video";
  /**
   * The ID that YouTube uses to uniquely identify the video.
   */
  id: string | null;
}

export interface Videos {
  videoPushed: Videos_videoPushed | null;
}
