import { TrackOnChannel } from '../../gql_types/TrackOnChannel'

const NextTrackPreview = ({ nextTrack }: { nextTrack?: TrackOnChannel }) => {
  return (
    <div className="root">
      {/*language=CSS*/}
      <style jsx>
        {`
          .root {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #fff;
          }
        `}
      </style>
      <div>
        <img src={nextTrack.thumb} style={{ borderRadius: 6, width: 220 }} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <div style={{ fontSize: 20, textAlign: 'center', padding: '16px 0' }}>
          {nextTrack.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ paddingRight: 16 }}>
            <img
              style={{ width: 50, borderRadius: 50 }}
              src={nextTrack.owner.picture}
            />
          </div>
          <div>{nextTrack.owner.fullName}</div>
        </div>
      </div>
    </div>
  )
}

export default ({ nextTrack }: { nextTrack?: TrackOnChannel }) => {
  if (!nextTrack) {
    return false
  }
  return (
    <div className="root">
      {/*language=CSS*/}
      <style jsx>
        {`
          .root {
            position: fixed;
            z-index: 10;
            bottom: 32px;
            right: 32px;
            padding: 12px;
            background-color: #000000aa;
            border-radius: 12px;
            border: solid 4px #ff2f7f;
            width: 344px;
          }
        `}
      </style>
      {nextTrack ? <NextTrackPreview nextTrack={nextTrack} /> : false}
    </div>
  )
}
