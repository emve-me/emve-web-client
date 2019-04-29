import Link from 'next/link'
import React from 'react'
import TV from '../../icons/TVIcon'
import Mobile from '../../icons/MobileIcon'
import CreateChannelController from './CreateChannelController'
import MobileOutlineIcon from '../../icons/MobileOutlineIcon'
import SelectionButton from './SelectionButton'
import Shell from '../../Shell'

export default () => <div className='root'
>

  { /*language=CSS*/}
  <style jsx>{`
      .root {
          padding-top: 100px;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
      }

      .mode_selector {
          padding-top: 100px;
          display: flex;
          width: 800px;
          justify-content: space-between;
      }

      .remote {
      }

      @media only screen and (max-width: 905px) {

          .root {
              padding-top: 50px;
          }

          .mode_selector {
              flex-direction: column;
              padding-top: 50px;
              width: auto;
          }

          .remote {
              padding-bottom: 50px;
          }

      }`
  }
  </style>


  <div style={{ fontSize: 40 }}>Use this device as a</div>

  <div className='mode_selector'>

    <div className='remote'>
      <Link href='/join'>
        <SelectionButton icon={<MobileOutlineIcon size={150}/>} label='Remote'/>
      </Link>
    </div>
    <CreateChannelController>{({ createParty }) =>
      <SelectionButton label='Player' onClick={createParty}
                       icon={<TV size={150}/>}/>}
    </CreateChannelController>
  </div>
</div>