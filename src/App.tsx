import React from 'react'
import { useGetData } from './hooks'

export const App = (): JSX.Element => {
  const { getData } = useGetData()

  getData().then(console.log)

  return <div className='App'>App</div>
}
