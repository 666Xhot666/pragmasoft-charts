import React, { useState, ChangeEvent } from 'react'

import {
  SwitchBarComponent,
  PieChartComponent,
  LineChartComponent,
} from '../components'

import { PropMainPage } from '../types'

export const MainPage: React.FC<PropMainPage> = ({ ndx }): JSX.Element => {
  const [groupParam, setGroupParam] = useState('markdown') //markdown || revenues || margin

  // function for select Param in SwitchBar
  const dropdownPropertyHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    const value = e.currentTarget.value
    if (groupParam !== value) {
      setGroupParam((prev): string => value)
    }
  }

  return (
    <div className='main-page'>
      <div className='container'>
        <SwitchBarComponent
          ndx={ndx}
          dropdownPropertyHandler={dropdownPropertyHandler}
        />
        <PieChartComponent ndx={ndx} groupParam={groupParam} />
        <LineChartComponent ndx={ndx} groupParam={groupParam} />
      </div>
    </div>
  )
}
