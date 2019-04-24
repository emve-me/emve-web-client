import React from 'react'
import AccountThumb from './AccountThumb'

export default ({ children }: { children: React.ReactNode }) => {

  return <>
    <header>


      <AccountThumb/>

    </header>
    {children}
  </>

}