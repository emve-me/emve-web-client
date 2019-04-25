import UpComingItemsConsumer from '../consumers/ChannelController'
import React from 'react'

type TProps = {
  channel: string
}

export default ({ channel }) => <UpComingItemsConsumer
  channel={channel}>{({ upComing, nowPlaying, loading }) => loading ? 'Loading' :
  <>{nowPlaying ? <div style={{ padding: '1rem', backgroundColor: 'pink' }}>{nowPlaying.title}</div> :
    <div>NOTHING PLAYING</div>}
    <div>{upComing.map(({ node }) => <div
      key={node.id}>
      <img src={node.thumb}/>
      {node.title}</div>)}</div>
  </>}
</UpComingItemsConsumer>
