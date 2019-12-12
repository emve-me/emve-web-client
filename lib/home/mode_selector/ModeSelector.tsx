import Link from 'next/link'
import React from 'react'
import TV from '../../icons/TVIcon'
import CreateChannelController from './CreateChannelController'
import MobileOutlineIcon from '../../icons/MobileOutlineIcon'
import SelectionButton from './SelectionButton'
import Shell from '../../ui/Shell'
import MobileFooterNav from '../../ui/MobileFooterNav'

const ModeSelector: React.FC = () => (
  <Shell visibleOnMobile={false}>
    <div className="root">
      {/*language=CSS*/}
      <style jsx>
        {`
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

          .accountThumb {
            display: none;
          }

          @media only screen and (max-width: 905px) {
            .root {
              padding-top: 25px;
            }

            .accountThumb {
              display: block;
            }

            .mode_selector {
              flex-direction: column;
              padding: 25px 0;

              width: auto;
            }

            .remote {
              padding-bottom: 25px;
            }
          }
        `}
      </style>

      <h1>Use this device as a</h1>

      <div className="mode_selector">
        <div className="remote">
          <Link href="/join">
            <a>
              <SelectionButton
                icon={<MobileOutlineIcon size={150} />}
                label="Remote"
              />
            </a>
          </Link>
        </div>
        <CreateChannelController>
          {({ createParty }) => (
            <SelectionButton
              label="Player"
              onClick={createParty}
              icon={<TV size={150} />}
            />
          )}
        </CreateChannelController>
      </div>

      <MobileFooterNav style={{ paddingBottom: 24 }} />
    </div>
  </Shell>
)

export default ModeSelector
