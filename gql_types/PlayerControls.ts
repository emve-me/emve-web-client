/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PlayerControlAction } from './globalTypes'

// ====================================================
// GraphQL subscription operation: PlayerControls
// ====================================================

export interface PlayerControls_playerControl {
  __typename: 'PlayerControl'
  action: PlayerControlAction | null
}

export interface PlayerControls {
  playerControl: PlayerControls_playerControl | null
}

export interface PlayerControlsVariables {
  channel: string
}
