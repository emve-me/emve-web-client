import React, { Component } from 'react'
import Shell from './Shell'
import { accentColor } from '../style/colors'

const Button: React.FC<{
  style?: React.CSSProperties
  onClick?: () => void
}> = ({ style, onClick, children }) => {
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
          background-color: ${accentColor};
          color: #fff;
        }
      `}</style>
      {children}
    </div>
  )
}

export default Button
