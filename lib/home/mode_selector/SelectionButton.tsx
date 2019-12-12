import React from 'react'
import { accentColor, textColor } from '../../style/colors'

type TProps = {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  className?: string
}

export default ({ icon, label, onClick }: TProps) => (
  <div className="root" onClick={onClick}>
    {/*language=CSS*/}
    <style jsx>{`
      .root {
        background-color: #fff;
        box-shadow: 1px 1px 1px #bbb;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: solid 3px #999;
        border-radius: 20px;
        width: 317px;
        height: 270px;
        cursor: pointer;
        color: ${textColor};
      }

      .root:hover {
        background-color: ${accentColor};
      }

      .root:hover :global(path) {
        fill: #fff;
      }

      .root:hover .label {
        color: #fff;
      }
    `}</style>
    {icon}

    <div className="label" style={{ paddingTop: 16, fontWeight: 'bold' }}>
      {label}
    </div>
  </div>
)
