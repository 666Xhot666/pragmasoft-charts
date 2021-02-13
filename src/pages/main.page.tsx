import React, { useState, ChangeEvent } from 'react'

import { SwitchBarComponent } from '../components'

import { PropMainPage } from '../types'

export const MainPage: React.FC<PropMainPage> = (ndx): JSX.Element => {
  const [groupParam, setGroupParam] = useState('markdown') //markdown || revenues || margin

  const dropdownPropertyHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    const value = e.currentTarget.value
    if (groupParam !== value) {
      setGroupParam((prev): string => {
        console.log(`Worked future callback ${value}`)
        return value
      })
    }
  }
  const resetHandler = () => {
    console.log('reset')
  }

  return (
    <div className='main-page'>
      <div className='container'>
        <SwitchBarComponent
          resetHandler={resetHandler}
          dropdownPropertyHandler={dropdownPropertyHandler}
        />
        MainPage
      </div>
    </div>
  )
}
