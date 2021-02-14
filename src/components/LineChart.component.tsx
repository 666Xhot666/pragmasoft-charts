import { useCallback, useEffect, FC, useState } from 'react'
import { PropsChartsComponent } from '../types'

const d3 = require('d3') // require used for fix type import error
const dc = require('dc') //

export const LineChartComponent: FC<PropsChartsComponent> = ({
  ndx,
  groupParam,
}): JSX.Element => {
  const [filters, setFilters] = useState<Array<string>>([])
  const updateChart = useCallback(
    (parameter) => {
      if (!ndx) return
      const dimension = ndx.dimension((d) => [d.item_category, d.date])
      const group = dimension
        .group()
        .reduceSum((d) =>
          parameter === 'margin'
            ? d.margin
            : parameter === 'revenues'
            ? d.revenues
            : d.markdown
        )

      // console.log(`Line Chart:`, group.all())

      const filterHandler = (_: any, filters: any) => {
        if (!filters.length) {
          dimension.filter(null!)
        } else {
          const filter = dc.filters.RangedFilter(filters[0][0], filters[0][1])
          dimension.filterFunction((k) => filter.isFiltered(k[1]))
        }
        return filters
      }

      const chart = dc.seriesChart('#linechart')
      chart
        .width(1200)
        .height(600)
        .chart((c: any) =>
          dc.lineChart(c).curve(d3.curveCardinal).filterHandler(filterHandler)
        )
        .x(d3.scaleTime().domain(d3.extent(group.all(), (d: any) => d.key[1])))
        .brushOn(true)
        .yAxisLabel(groupParam)
        .yAxisPadding('10%')
        .useViewBoxResizing(true)
        .elasticY(true)
        .xAxisLabel('Date')
        .dimension(dimension)
        .group(group)
        // .mouseZoomable(true)
        .seriesAccessor((d: any) => d.key[0])
        .keyAccessor((d: any) => d.key[1])
        .valueAccessor((d: any) => d.value)
        .legend(
          dc.legend().x(100).y(0).legendWidth(1000).gap(10).horizontal(true)
        )
      chart.filterHandler(filterHandler)

      chart.on('filtered', (chart: any) => {
        const filters = chart.filters()
        if (filters.length) {
          setFilters([`From: ${filters[0][0]}`, `To: ${filters[0][1]}`])
        } else {
          setFilters([])
        }
      })
      //
      //
      chart.margins().left += 50
      return chart.render()
    },
    [groupParam, ndx]
  )

  useEffect(() => {
    updateChart(groupParam)
    // console.log('Update Line chart')
  }, [updateChart, groupParam])

  return (
    <div className='line-chart s12 m12 l12'>
      <div className='title s12 m12 l12 center'>
        {!filters.length && (
          <span className='time-filters'>No Time Filters selected</span>
        )}
        {!!filters.length && (
          <div className='time-filters '>
            <span className='from-time left'>
              <blockquote>
                {filters[0].split(' ').slice(0, 6).join(' ')}
              </blockquote>
            </span>
            <span className='to-time right'>
              <blockquote>
                {filters[1].split(' ').slice(0, 6).join(' ')}
              </blockquote>
            </span>
          </div>
        )}
      </div>
      <div id='linechart' />
    </div>
  )
}
