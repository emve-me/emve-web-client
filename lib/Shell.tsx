import React from 'react'
import AccountThumb from './AccountThumb'
import HeartIcon from './icons/HeartIcon'
import Link from 'next/link'

export default ({ children }: { children: React.ReactNode }) => {

  return <>
    { /*language=CSS*/}
    <style jsx>{`

        header {
            border-bottom: solid 1px rgba(0, 0, 0, 0.25);
            background-color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px 14px;
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            height: 70px;
        }


    `}
    </style>

    <header>
      <Link href='/'>
        <HeartIcon style={{ cursor: 'pointer' }} size={30}/>
      </Link>
      <div style={{ flex: 1 }} id='HEADER_PORTAL'/>

      <AccountThumb thumbSize={33}/>

    </header>
    {children}
  </>

}