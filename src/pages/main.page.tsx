import React, { useState } from 'react'

import { SwitchBarComponent } from '../components'

import { PropMainPage } from '../types'

export const MainPage: React.FC<PropMainPage> = ({
  ndx,
}: PropMainPage): JSX.Element => {
  const [groupParam, setGroupParam] = useState('markdown') //markdown || revenues || margin

  return (
    <div className='main-page'>
      <div className='container'>
        <SwitchBarComponent />
        MainPage
      </div>
    </div>
  )
}
