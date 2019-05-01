import React, { Component } from 'react'
import AppPortal from './AppPortal'

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
            background-color: #fff;
            z-index: 10000;
          }
        `}</style>

        <div className="root">
          <div onClick={onClose}>CLOSE</div>
          {children}
        </div>
      </AppPortal>
    )
  }
}
