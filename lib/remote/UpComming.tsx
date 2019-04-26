import ChannelController from '../consumers/ChannelController'
import React from 'react'
import LoadingIndicator from '../ui/LoadingIndicator'
import { TrackOnChannel } from '../../gql_types/TrackOnChannel'
import { TrackState } from '../../gql_types/globalTypes'
import RemoteEmptyState from './RemoteEmptyState'

type TProps = {
  channel: string
}

const Track = ({ thumb, title, owner, state }: TrackOnChannel) => <div
  style={{ display: 'flex', alignItems: 'center', marginBottom: 26 }}>
  <div style={{ paddingRight: 16 }}>
    <img style={{ width: 140, borderRadius: 6 }} src={thumb}/>
  </div>
  <div>
    {state === TrackState.playing ? <div>now playing</div> : false}
    <div dangerouslySetInnerHTML={{ __html: title }}/>
    <div style={{ display: 'flex', alignItems: 'center', paddingTop: 4 }}>
      <img src={owner.picture} style={{ width: 25, height: 25, borderRadius: 50 }}/>
      <div style={{ color: '#666', paddingLeft: 6, fontSize: 15 }}>{owner.fullName}</div>
    </div>
  </div>
</div>

const Card = ({ children }: { children: React.ReactNode }) =>
  (<div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 3, border: 'solid 1px #ccc' }}>
      {children}
    </div>
  )

export default ({ channel }: TProps) => <ChannelController
  channel={channel}>{({ upComing, nowPlaying, loading, owner }) => {

  if (loading) {
    return <LoadingIndicator/>
  }

  return <>
    {!nowPlaying && upComing.length === 0 ? <RemoteEmptyState/> : false}


    <img style={{ borderRadius: 50, width: 50 }} src={owner.picture}/>
    {owner.fullName}

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {nowPlaying ? <Track {...nowPlaying} /> : false}
      {upComing.map(({ node }) =>
        <Track
          key={node.id} {...node}/>)}</div>
  </>


}}</ChannelController>


