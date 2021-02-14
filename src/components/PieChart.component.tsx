import React, { useCallback, useEffect } from 'react'
import { utils, pieChart, legend as dcLagend } from 'dc'
import { PropsChartsComponent } from '../types'

const d3 = require('d3')

export const PieChartComponent: React.FC<PropsChartsComponent> = ({
  ndx,
  groupParam,
}): JSX.Element => {
  const prettransition = (chart: any) => {
    chart.selectAll('text.pie-slice').text((d: any) => {
      const percent = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
      return percent >= 6.2
        ? `${d.data.key} ${utils.printSingleValue(percent)}  %`
        : percent < 2
        ? ''
        : d.data.key
    })
  }

  const updateChart = useCallback(
    (parameter): void => {
      if (!ndx) return
      const dimension = ndx.dimension((d) => d.item_category)
      const group = dimension
        .group()
        .reduceSum((d) =>
          parameter === 'margin'
            ? d.margin
            : parameter === 'revenues'
            ? d.revenues
            : d.markdown
        )
      console.log(`Pie Chart:`, group.all())
      return pieChart('#pie-chart')
        .width(800)
        .height(550)
        .dimension(dimension)
        .group(group)
        .legend(dcLagend().gap(10))
        .colors(d3.scaleOrdinal(d3.schemeCategory10))
        .on('pretransition', prettransition)
        .render()
    },
    [ndx]
  )

  useEffect(() => {
    updateChart(groupParam)
  }, [updateChart, groupParam])

  return (
    <div className='pie-chart center'>
      <div id='pie-chart' />
    </div>
  )
}
