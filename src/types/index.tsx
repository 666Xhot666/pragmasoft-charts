import { Crossfilter } from 'crossfilter2'
import { ChangeEvent } from 'react'

export type NdxState = Crossfilter<Filtered>

export type PropMainPage = {
  ndx: NdxState
}

export type ObjFromCSV = {
  Item_code: string
  item_category: string
  year_ref: string
  week_ref: string
  markdown: string
  margin: string
  revenues: string
}
export interface Filtered {
  Item_code: string
  item_category: string
  markdown: number
  margin: number
  revenues: number
  date: string
}

export type PropsSwitchBar = {
  ndx?: NdxState
  resetHandler: () => void
  dropdownPropertyHandler: (e: ChangeEvent<HTMLSelectElement>) => void
}
export type PropsPieChartsComponent = {
  ndx: NdxState
  groupParam: string
}
