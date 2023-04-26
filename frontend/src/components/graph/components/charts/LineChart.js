import React, { useEffect, useRef, useState } from "react";
import Chart from 'react-apexcharts';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LineChart(props) {

    const startState = []
    const myData = useRef(startState);
    const [h, setH] = useState(50);
    let h1 = 50;

    const series = [
        {
          name: props.name,
          data: props.dataArr
        }
    ];
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
            <Chart type='line'
            width={"100%"}
            height={h + "%"}
            series={series}
            options={{
                chart: {
                    width:"100%",
                    height: h + "%",
                    id: 'realtime',
                    type: 'line',
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                          speed: 2
                        }
                      },
                    zoom: {
                      enabled: false
                    },
                    background: "#FFFFF",
                    fontFamily: "Century Gothic",
                    toolbar: {
                        show: false,
                        tools: {
                            selection: true,
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                            reset: true
                        }
                    },
                  },
                dataLabels: {
                    enabled: false
                },
                title:{
                    text:props.name,
                    align: 'center',
                    style: {
                        fontFamily: "Century Gothic",
                        fontSize: "12px"
                      }
                },
                legend: {
                    show: false
                },
                stroke: {
                    curve: "smooth",
                    lineCap: "round",
                    width: 3
                },
                markers: {
                    hover: {
                        size: 0,
                        sizeOffset: 6
                    }
                },
                xaxis:{
                    labels: {show: false},
                    title:{
                        text:"Time",
                        style: {
                            fontFamily: "Century Gothic",
                            fontSize: "12px"
                        },
                        
                    }
                },
                yaxis:{
                    labels: {
                        style: {
                            fontFamily: "Century Gothic",
                            fontSize: '12px'
                        }
                    }
                },
                theme: {
                    mode: "dark",
                    palette: props.palette
                }
            }}
            >
            </Chart>
        </div>
    );
}

