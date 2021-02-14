// import * as d3 from 'd3'
import { lineChart, legend as dcLagend, seriesChart } from 'dc'
import React, { useCallback, useEffect } from 'react'
import { PropsChartsComponent } from '../types'

const d3 = require('d3')
const dc = require('dc')

export const LineChartComponent: React.FC<PropsChartsComponent> = ({
  ndx,
  groupParam,
}): JSX.Element => {
  const updateChart = useCallback(() => {
    if (!ndx) return
    const dimension = ndx.dimension((d) => [d.item_category, d.date])
    const group = dimension.group().reduceSum((d) => d.markdown)
    console.log(`Line Chart:`, group.all())

    const filterHandler = (_: any, filters: any) => {
      if (filters.length) {
        const filter = dc.filters.RangedFilter(filters[0][0], filters[0][1])
        dimension.filterFunction((k) => filter.isFiltered(k[1]))
      }
      return filters
    }

    return (
      seriesChart('#linechart')
        .minWidth(600)
        .minHeight(400)
        .width(1200)
        .height(600)

        .chart((c) =>
          dc.lineChart(c).curve(d3.curveCardinal).filterHandler(filterHandler)
        )
        .x(d3.scaleTime().domain(d3.extent(group.all(), (d: any) => d.key[1])))
        .brushOn(true)
        .yAxisLabel(groupParam)
        .yAxisPadding(100)
        // .yAxis(scale())
        // .tickFormat((v) => v)
        .elasticY(true)
        .clipPadding(20)
        .xAxisLabel('Date')
        .dimension(dimension)
        .group(group)
        .mouseZoomable(true)
        .seriesAccessor((d) => `${d.key[0]}`)
        .seriesSort(d3.descending)
        .keyAccessor((d) => d.key[1])
        .valueAccessor((d) => d.value)
        .legend(
          dcLagend().x(100).y(0).legendWidth(1000).gap(10).horizontal(true)
        )
        .colors(d3.scaleOrdinal(d3.schemeCategory10))
        .filterHandler(filterHandler)
        .render()
    )
  }, [groupParam, ndx])

  useEffect(() => {
    updateChart()
  }, [updateChart, groupParam])

  return (
    <div className='line-chart'>
      <div id='linechart' />
    </div>
  )
}
