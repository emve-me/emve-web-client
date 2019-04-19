/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UpComingTracksGQL
// ====================================================

export interface UpComingTracksGQL_channel_tracks_edges_node {
  __typename: "Track";
  id: string | null;
  title: string | null;
}

export interface UpComingTracksGQL_channel_tracks_edges {
  __typename: "TracksEdge";
  node: UpComingTracksGQL_channel_tracks_edges_node | null;
}

export interface UpComingTracksGQL_channel_tracks {
  __typename: "Tracks";
  edges: (UpComingTracksGQL_channel_tracks_edges | null)[] | null;
}

export interface UpComingTracksGQL_channel {
  __typename: "Channel";
  tracks: UpComingTracksGQL_channel_tracks | null;
}

export interface UpComingTracksGQL {
  channel: UpComingTracksGQL_channel | null;
}

export interface UpComingTracksGQLVariables {
  channel: string;
}
