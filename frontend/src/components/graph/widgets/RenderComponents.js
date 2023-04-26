import React from "react"

import LineChart from "../components/charts/LineChart"
import RadialChart from "../components/charts/RadialChart"
import AreaChart from "../components/charts/AreaChart"
import TimeChart from "../components/charts/TimeChart"
import BoxChart from "../components/charts/BoxChart"
import RadarChart from "../components/charts/RadarChart"
import { BOX_CHART, RADIAL_CHART, AREA_CHART, LINE_CHART, RADAR_CHART, TIME_CHART } from "../Constants"
import Box from "../components/charts/Box"
import '../components/charts/Charts.css'

export default function renderComponents(component, activeID, time, arr, data, h, w, palette, dataType) {
    switch (component.chartType) {
        case (LINE_CHART):
            return <LineChart name={component.name}
                time={time}
                color={component.color}
                dataArr={arr}
                colorFill={component.colorFill}
                activeID={activeID}
                timeInterval={component.timeInterval}
                height={h}
                width={w}
                palette={palette}
            />
        case (AREA_CHART):
            return <AreaChart name={component.name}
                time={time}
                dataArr={arr}
                activeID={activeID}
                height={h}
                width={w}
                palette={palette}
            />
        case (RADIAL_CHART):
            return <RadialChart name={component.name}
                time={time}
                dataArr={data}
                activeID={activeID}
                height={h}
                width={w}
                palette={palette}
                type={dataType}
            />
        case (RADAR_CHART):
            return <RadarChart name={component.name}
                time={time}
                dataArr={arr}
                activeID={activeID}
                height={h}
            />
        case (BOX_CHART):
            return <BoxChart name={component.name}
                time={time}
                dataArr={arr}
                activeID={activeID}
                height={h} 
            />
        case (TIME_CHART):
            return <TimeChart time={time} />
        default:
            return <Box name={component.name} time={time}></Box>
    }
}