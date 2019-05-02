import { TrackOnChannel } from '../../gql_types/TrackOnChannel'
import { accentColor } from '../style/colors'

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
      <div style={{ fontWeight: 'bold' }}>UP NEXT</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <div
          style={{ fontSize: 20, textAlign: 'center', padding: '16px 0' }}
          dangerouslySetInnerHTML={{ __html: nextTrack.title }}
        />
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

export default ({
  nextTrack,
  channel
}: {
  channel: string
  nextTrack?: TrackOnChannel
}) => {
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
            border: solid 4px ${accentColor};
            width: 344px;
            color: #fff;
          }
        `}
      </style>
      {nextTrack ? (
        <NextTrackPreview nextTrack={nextTrack} />
      ) : (
        <div style={{ textAlign: 'center', lineHeight: '150%' }}>
          Visit emve.me and enter pairing code {channel} to play the next song
        </div>
      )}
    </div>
  )
}
