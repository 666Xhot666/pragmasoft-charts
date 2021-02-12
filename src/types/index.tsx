import { Crossfilter } from 'crossfilter2'

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
