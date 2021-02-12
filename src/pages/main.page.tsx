import React, { useState } from 'react'

import { PropMainPage } from '../types'

export const MainPage: React.FC<PropMainPage> = ({ ndx }: PropMainPage) => {
  const [groupParam, setGroupParam] = useState('markdown') //markdown || revenues || margin

  return <div>{JSON.stringify(ndx?.all()[1])}</div>
}
