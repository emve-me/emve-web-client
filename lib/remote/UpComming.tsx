import UpComingItemsConsumer from '../consumers/ChannelController'
import React from 'react'
import LoadingIndicator from '../ui/LoadingIndicator'

type TProps = {
  channel: string
}

export default ({ channel }: TProps) => <UpComingItemsConsumer
  channel={channel}>{({ upComing, nowPlaying, loading }) => {

  if (loading) {
    return <LoadingIndicator/>
  }

  return <>{nowPlaying ? <div style={{ padding: '1rem', backgroundColor: 'pink' }}>{nowPlaying.title}</div> :
    <div>NOTHING PLAYING</div>}
    <div>{upComing.map(({ node }) => <div
      key={node.id}>
      <img src={node.thumb}/>
      {node.title}</div>)}
    </div>
  </>


}}
</UpComingItemsConsumer>
