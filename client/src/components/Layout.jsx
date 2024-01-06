import React from 'react'
import {Navigation} from './Navigation.jsx'

export const Layout = ({children}) => {
  return (
    <React.Fragment>
      <div className='container mx-auto'>
        <Navigation/>
        {children}
      </div>
    </React.Fragment>
  )
}
