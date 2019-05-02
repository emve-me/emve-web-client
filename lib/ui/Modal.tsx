import React, { Component } from 'react'
import AppPortal from './AppPortal'
import ClearIcon from '../icons/ClearIcon'
import { appBackgroundColor } from '../style/colors'

export default class Modal extends Component<{
  open: boolean
  onClose: () => void
}> {
  static defaultProps = {
    open: false
  }

  render() {
    const { open, onClose, children } = this.props

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
}
