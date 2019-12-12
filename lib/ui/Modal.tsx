import React from 'react'
import AppPortal from './AppPortal'
import ClearIcon from '../icons/ClearIcon'
import { appBackgroundColor } from '../style/colors'

type TProps = {
  open: boolean
  onClose: () => void
}
const Modal: React.FC<TProps> = ({ open, onClose, children }) => {
  return (
    <AppPortal>
      {/*language=CSS*/}
      <style jsx>{`
        .root {
          display: ${open ? 'flex' : 'none'};
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background-color: ${appBackgroundColor};
          z-index: 10000;
          justify-content: center;
          align-items: center;
        }

        .clear {
          position: fixed;
          top: 15px;
          right: 15px;
          cursor: pointer;
        }
      `}</style>

      <div className="root">
        <div className="clear" onClick={onClose}>
          <ClearIcon width={34} />
        </div>
        {children}
      </div>
    </AppPortal>
  )
}

export { Modal as default }
