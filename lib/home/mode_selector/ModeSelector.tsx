import Link from 'next/link'
import React from 'react'
import TV from '../../icons/TVIcon'
import Mobile from '../../icons/MobileIcon'
import CreateChannelController from './CreateChannelController'
import MobileOutlineIcon from '../../icons/MobileOutlineIcon'
import SelectionButton from './SelectionButton'

export default () => <div
  style={{ height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>

  <div style={{ fontSize: 40 }}>Use this device as a</div>

  <div style={{ padding: '100px 0 260px 0', display: 'flex', width: '60%', justifyContent: 'space-around' }}>

    <Link href='/join'>
      <SelectionButton icon={<MobileOutlineIcon size={150}/>} label='Remote'/>
    </Link>

    <CreateChannelController>{({ createParty }) =>
      <SelectionButton label='Player' onClick={createParty}
                       icon={<TV size={150}/>}/>}
    </CreateChannelController>
  </div>
</div>