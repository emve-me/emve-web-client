/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addVideo
// ====================================================

export interface addVideo_videoPush {
  __typename: "Track";
  id: string | null;
  title: string | null;
  videoId: string | null;
  played: boolean | null;
}

export interface addVideo {
  videoPush: addVideo_videoPush | null;
}

export interface addVideoVariables {
  videoId: string;
  channel: string;
  title?: string | null;
}
