import React from 'react'
import Shell from './Shell'
import Link from 'next/link'
import LoggedInUserController from './consumers/LoggedInUserController'

export default () => (
  <div className="root">
    {/*language=CSS*/}
    <style jsx>
      {`
        .root {
          display: none;
        }

        @media only screen and (max-width: 905px) {
          .root {
            display: block;
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
