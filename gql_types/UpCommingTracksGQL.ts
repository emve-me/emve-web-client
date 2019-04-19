/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UpCommingTracksGQL
// ====================================================

export interface UpCommingTracksGQL_channel_tracks_edges_node {
  __typename: "Track";
  id: string | null;
  title: string | null;
}

export interface UpCommingTracksGQL_channel_tracks_edges {
  __typename: "TracksEdge";
  node: UpCommingTracksGQL_channel_tracks_edges_node | null;
}

export interface UpCommingTracksGQL_channel_tracks {
  __typename: "Tracks";
  edges: (UpCommingTracksGQL_channel_tracks_edges | null)[] | null;
}

export interface UpCommingTracksGQL_channel {
  __typename: "Channel";
  tracks: UpCommingTracksGQL_channel_tracks | null;
}

export interface UpCommingTracksGQL {
  channel: UpCommingTracksGQL_channel | null;
}

export interface UpCommingTracksGQLVariables {
  channel: string;
}
