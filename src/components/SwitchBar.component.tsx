import React, { useCallback, useEffect } from 'react'
import { dataCount, filterAll, refocusAll, renderAll } from 'dc'

import { PropsSwitchBar } from '../types'

import M from 'materialize-css'

export const SwitchBarComponent: React.FC<PropsSwitchBar> = (
  params
): JSX.Element => {
  const { dropdownPropertyHandler } = params

  //markdown || revenues || margin
  //init select
  document.addEventListener('DOMContentLoaded', () => {
    M.FormSelect.init(document.querySelectorAll('select'))
  })

  //udatin dataCount (selected records by filter  or group from all records)
  const updateCount = useCallback((): void => {
    const { ndx } = params
    if (!ndx) return
    const dataCountHandler = dataCount('.data-count')
    dataCountHandler.dimension(ndx).group(ndx.groupAll())
    return dataCountHandler.render()
  }, [params])

  //loading element when component is loaded
  useEffect(() => {
    updateCount()
  }, [updateCount])

  return (
    <div className='switch-bar center-align row'>
      <div className='select col s12 m6 l2'>
        <label>Parameter Select</label>
        <select id='parameters' onChange={dropdownPropertyHandler}>
          <option value='markdown'>markdown</option>
          <option value='revenues'>revenues</option>
          <option value='margin'> margin</option>
        </select>
      </div>
      <div className='data-count  col s12  m6 l3 offset-l2'>
        <span className='filter-count' />
        {' selected of '}
        <span className='total-count' />
        {' records!'}
      </div>
      <div className='button col s12 m6 l2 offset-l8'>
        <button
          className='btn-large  green darken-2 waves-effect'
          //reset all selected filters and groups, redraw both charts
          onClick={() => {
            filterAll()
            refocusAll()
            renderAll()
          }}
        >
          Reset all
        </button>
      </div>
    </div>
  )
}
