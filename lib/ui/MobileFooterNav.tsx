import React from 'react'
import Link from 'next/link'
import { logout } from '../consumers/useLoggedInUser'

export default ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div className="root" style={style}>
      {/*language=CSS*/}
      <style jsx>
        {`
          .root {
            display: none;
          }

          @media only screen and (max-width: 905px) {
            .root {
              display: flex;
              justify-content: center;
            }
          }
        `}
      </style>
      <Link href="/">
        <a>Home</a>
      </Link>
      &nbsp;&middot;&nbsp;
      <a onClick={logout}>Logout</a>
    </div>
  )
}
