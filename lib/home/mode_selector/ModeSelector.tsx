import Link from 'next/link'
import React from 'react'
import TV from '../../icons/TVIcon'
import Mobile from '../../icons/MobileIcon'
import CreateChannelController from './CreateChannelController'

export default () => <>

  <Link href='/join'>
    <Mobile size={100}/>
  </Link>

  <CreateChannelController>{({ createParty }) => <div onClick={createParty}>
    <TV size={100}/></div>}</CreateChannelController>

</>