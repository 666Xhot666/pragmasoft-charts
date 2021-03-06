import { useCallback } from 'react'

import { parse } from 'papaparse'

import { Filtered, ObjFromCSV } from '../types'

const d3 = require('d3') // required used for fix type import error

const dateParse = d3.timeParse('%Y/%W')
//loading and parsing data.csv fom public folder
export const useGetData = () => {
  const getData = useCallback(async (): Promise<Filtered[]> => {
    const response = await fetch('/data.csv')
    const data = await response.text()
    const parsed = parse(data, { header: true }).data
    const filtered = parsed.map(
      (obj): Filtered => {
        const {
          Item_code,
          item_category,
          year_ref,
          week_ref,
          markdown,
          margin,
          revenues,
        } = obj as ObjFromCSV
        //date formate
        const date = dateParse(`${year_ref}/${week_ref}`)
        return {
          Item_code,
          item_category,
          markdown: +markdown,
          margin: +margin,
          revenues: +revenues,
          date,
        }
      }
    )
    return filtered
  }, [])
  return { getData }
}
