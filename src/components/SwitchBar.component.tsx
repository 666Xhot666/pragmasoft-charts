import React, { useEffect, useState, MouseEvent, useCallback } from 'react'
import M from 'materialize-css'

export const SwitchBarComponent = () => {
  const [groupParam, setGroupParam] = useState('markdown') //markdown || revenues || margin

  document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.dropdown-trigger')
    const instances = M.Dropdown.init(elems, {
      hover: true,
      coverTrigger: false,
      onCloseStart: propHandler,
    })
  })

  const propHandler = useCallback(() => {
    setGroupParam((prev) => {
      console.log(`Worked future callback ${prev}`)
      return prev
    })
  }, [])

  //markdown || revenues || margin
  return (
    <div className='switch-bar center-align'>
      <input
        className='dropdown-trigger btn pulse'
        data-target='dropdown1'
        type='button'
        value={groupParam}
      />

      <ul id='dropdown1' className='dropdown-content'>
        <li>
          <input
            type='button'
            value='markdown'
            onClick={() => setGroupParam('markdown')}
            className='btn-large blue darken-3'
          />
        </li>
        <li>
          <input
            type='button'
            value='revenues'
            onClick={() => setGroupParam('revenues')}
            className='btn-large blue darken-3'
          />
        </li>
        <li>
          <input
            type='button'
            value='margin'
            onClick={() => setGroupParam('margin')}
            className='btn-large blue darken-3'
          />
        </li>
      </ul>
    </div>
  )
}
