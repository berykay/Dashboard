import React, { useEffect, useState, useRef } from "react";
import Chart from 'react-apexcharts';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RadialChart(props) {
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
            <Chart type='radialBar'
            width={"100%"}
            height={h + "%"}
            series={[props.dataArr]}
            options = {{
              chart: {
                width: h + "%",
                height:  h + "%",
                type: 'radialBar',
                toolbar: {
                  show: true
                },
                background: "#FFFFF",
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
            plotOptions: {
              radialBar: {
                startAngle: 0,
                endAngle: 360,
                 hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#d1dae8',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 0,
                    blur: 4,
                    opacity: 0.15
                  }
                },
                track: {
                  background: '#fff',
                  strokeWidth: '67%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -4,
                    show: true,
                    color: '#161717',
                    fontSize: '14px'
                  },
                  value: {
                    offsetY: -4,
                    formatter: function(val) {
                      return parseFloat(val);
                    },
                    color: '#161717',
                    fontSize: '14px',
                    fontFamily: 'Century Gothic',
                    show: true,
                  }
                }
              }
            },
            title: {
              text: props.name,
              align: 'left',
              margin: 10,
              offsetX: 0,
              offsetY: 0,
              floating: false,
              style: {
                fontSize:  '14px',
                fontFamily:  'Century Gothic',
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                type: "vertical",
                gradientToColors: ["#87D4F9"],
                stops: [0, 100]
              }
            },
            stroke: {
              lineCap: 'round'
            },
            theme: {
              mode: "dark",
              palette: props.palette
            },
            labels: [props.type],
            }
          }
              
            >
            </Chart>
        </div>
    );
}

