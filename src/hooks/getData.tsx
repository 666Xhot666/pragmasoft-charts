import React, { useCallback } from 'react'

import { parse } from 'papaparse'

import { Filtered, ObjFromCSV } from '../types'

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
        return {
          Item_code,
          item_category,
          markdown,
          margin,
          revenues,
          date: { year_ref, week_ref },
        }
      }
    )
    return filtered
  }, [])
  return { getData }
}
