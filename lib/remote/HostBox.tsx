import Link from 'next/link'
import Card from './Card'
import { UpComingTracksGQL_channel_owner } from '../../gql_types/UpComingTracksGQL'
import Modal from '../ui/Modal'
import { Component } from 'react'
import InviteGuests from '../ui/InviteGuests'

export default class extends Component<
  { channel: string; owner: UpComingTracksGQL_channel_owner },
  { inviteModalOpen: boolean }
> {
  state = { inviteModalOpen: false }

  render() {
    const { inviteModalOpen } = this.state

    const { channel, owner } = this.props

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
              border: 'solid 2px #ff2f7f'
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
              onClose={() => this.setState({ inviteModalOpen: false })}>
              <InviteGuests channel={channel} />
            </Modal>
            <a onClick={() => this.setState({ inviteModalOpen: true })}>
              Invite guests
            </a>
            &nbsp;&middot;&nbsp;
            <Link href="/">
              <a>Leave party</a>
            </Link>
          </div>
        </div>
      </Card>
    )
  }
}
