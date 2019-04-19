/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: JoinChannel
// ====================================================

export interface JoinChannel_channelJoin {
  __typename: "Channel";
  id: string | null;
}

export interface JoinChannel {
  channelJoin: JoinChannel_channelJoin | null;
}

export interface JoinChannelVariables {
  channel: string;
}
