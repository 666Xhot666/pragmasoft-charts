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
export type Filtered = {
  Item_code: string
  item_category: string
  markdown: string
  margin: string
  revenues: string
  date: { year_ref: string; week_ref: string }
}

export type PropsSwitchBar = {
  resetHandler: () => void
  dropdownPropertyHandler: (e: ChangeEvent<HTMLSelectElement>) => void
}
