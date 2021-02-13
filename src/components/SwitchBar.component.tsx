import React from 'react'
import M from 'materialize-css'

import { PropsSwitchBar } from '../types'

export const SwitchBarComponent: React.FC<PropsSwitchBar> = (params) => {
  const { resetHandler, dropdownPropertyHandler } = params

  //markdown || revenues || margin
  document.addEventListener('DOMContentLoaded', () => {
    M.FormSelect.init(document.querySelectorAll('select'))
  })

  return (
    <div className='switch-bar center-align row'>
      <div className='select col s12 m6 l2'>
        <select id='parameters' onChange={dropdownPropertyHandler}>
          <option value='markdown'>markdown</option>
          <option value='revenues'>revenues</option>
          <option value='margin'> margin</option>
        </select>
        <label htmlFor='parameters'>Parameter Select</label>
      </div>
      <div className='button col s12 m6 l2 offset-l8'>
        <button
          className='btn-large btn-floating orange darken-4'
          onClick={resetHandler}
        >
          Reset all
        </button>
      </div>
    </div>
  )
}
