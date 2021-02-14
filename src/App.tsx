import React, { useCallback, useState, useEffect } from 'react'
import crossfilter from 'crossfilter2'
import { NavBarComponent } from './components'
import { MainPage } from './pages'

import { useGetData } from './hooks'

import { NdxState } from './types'

export const App = (): JSX.Element => {
  const { getData } = useGetData()
  const [ndx, setNdx] = useState<NdxState>()

  const fetchData = useCallback(async () => {
    const data = await getData()
    data.pop()
    const ndx = crossfilter(data)
    setNdx(ndx)
  }, [getData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <NavBarComponent />
      <MainPage ndx={ndx as NdxState} />
    </>
  )
}
