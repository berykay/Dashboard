import React, { useEffect, useRef, useState } from "react";
import Chart from 'react-apexcharts';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RadarChart(props) {
    const startState = []
    
    const myData = useRef(startState);
    const [h, setH] = useState(50);
    let h1 = 50;

    useEffect(() => {
      setH(h1 * props.height * 1.3);
    }, [props.height]);

    useEffect(() => {
        for (var i = props.timeInterval - 1; i >= 0; i--) {
            if (props.time - i > 0)
                myData.current.push({ "time": props.time - i, [props.name]: 0 },)
            else
                myData.current.push({ [props.name]: 0 },)
        }
    }, [undefined,props.activeID])


    return (
        <div>
            <Chart type='radar'
            width={"100%"}
            height={h + "%"}
            series= {[{
              name: 'Series 1',
              data: props.dataArr,
            }]}
              options= {{
                chart: {
                  width: h + "%",
                  height: h + "%",
                  type: 'radar',
                  toolbar: {
                    show: false
                  },
                },
                fill: {
                  opacity: 0.5,
                  gradient: {
                      shadeIntensity: 1,
                      type: 'solid',
                      opacityFrom: 0.7,
                      opacityTo: 1
                  }
                },
                legend: {
                    show: false
                },
                stroke: {
                    lineCap: "round",
                    width: 2,
                    colors: ['#562eb5', '#8f012e'],
                },
                markers: {
                    hover: {
                        size: 0,
                        sizeOffset: 6
                    }
                },
                grid: {
                  opacity: 0.6,
                  borderColor: '#818282',
                },
                title: {
                  text: 'Core Usage %',
                  style: {
                    color: "#fff",
                    fontFamily: "Century Gothic",
                    fontSize: '14px'
                  }
                },
                xaxis: {
                  categories: ['Core1', 'Core2', 'Core3', 'Core4', 'Core5', 'Core6', 'Core7']
                },
                yaxis:{
                  labels: {
                      style: {
                          fontFamily: "Century Gothic",
                          fontSize: '10px',
                          colors: "#fff"
                      }
                  }
                }
              }}
            >
            </Chart>
        </div>
    );
}

