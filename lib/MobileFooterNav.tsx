import React from 'react'
import Shell from './Shell'
import Link from 'next/link'
import LoggedInUserController from './consumers/LoggedInUserController'

export default ({ style, a }: { a?; style?: React.CSSProperties }) => {
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
      <LoggedInUserController>
        {({ logout }) => <a onClick={logout}>Logout</a>}
      </LoggedInUserController>
    </div>
  )
}
