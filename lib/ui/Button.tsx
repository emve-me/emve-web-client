import React, { Component } from 'react'
import Shell from '../Shell'

export default class Button extends Component<{
  style?: React.CSSProperties
  onClick?: () => void
}> {
  render() {
    const { style, onClick, children } = this.props
    return (
      <div className="button" style={style} onClick={onClick}>
        {/*language=CSS*/}
        <style jsx>{`
          .button {
            display: inline-block;
            cursor: pointer;
            padding: 10px;
            font-size: 20px;
            border-radius: 6px;
            text-align: center;
            border: 3px solid #555;
          }

          .button:hover {
            background-color: #ff2f7f;
            color: #fff;
          }
        `}</style>
        {children}
      </div>
    )
  }
}
