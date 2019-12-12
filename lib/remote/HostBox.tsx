import Link from 'next/link'
import Card from './Card'
import { UpComingTracksGQL_channel_owner } from '../../gql_types/UpComingTracksGQL'
import Modal from '../ui/Modal'
import { Component, useState } from 'react'
import InviteGuests from '../ui/InviteGuests'
import { accentColor } from '../style/colors'

type TProps = { channel: string; owner: UpComingTracksGQL_channel_owner }

const HostBox: React.FC<TProps> = ({ channel, owner }) => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false)

  return (
    <Card
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <div>
        <img
          style={{
            borderRadius: 55,
            width: 55,
            border: `solid 2px ${accentColor}`
          }}
          src={owner.picture}
        />
      </div>

      <div style={{ lineHeight: '175%', textAlign: 'center' }}>
        <div style={{ padding: '0px 0', fontWeight: 400, fontSize: 18 }}>
          Welcome to {owner.firstName}'s party!
        </div>

        <div>
          Pairing code: <span>{channel}</span>
        </div>
        <div>
          <Modal
            open={inviteModalOpen}
            onClose={() => setInviteModalOpen(false)}>
            <InviteGuests channel={channel} />
          </Modal>
          <a onClick={() => setInviteModalOpen(true)}>Invite guests</a>
          &nbsp;&middot;&nbsp;
          <Link href="/">
            <a>Leave party</a>
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default HostBox
