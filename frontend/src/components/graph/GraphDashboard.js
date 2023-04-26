import React, { useEffect, useState, useRef } from "react";
import NotificationController from './components/NotificationController';
import './GraphBuilder.css';
import { getCurrArr, getCurrTime, getCurrData } from "./hub/hubOn";
import useChartComponents from './hooks/useChartComponents';
import renderComponents from './widgets/RenderComponents';
import { CPU, RAM, DISK, MEMORY, CPU_FREQ, LOAD_AVG, BATTERY, TEMPERATURE, CORES, TIME } from './Constants';
import Stations from './components/Stations';
import { Responsive, WidthProvider } from "react-grid-layout";
import DropDown from './components/AddChart';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

function GraphDashboard() {
    const [time, setTime] = useState(0);
    const [activeID, setActiveID] = useState(1);
    const [chartComponents, setChartComponents] = useChartComponents();
    const [chartComponentsCopy, setChartComponentsCopy] = useState([]);
    const temp_arr = useRef([0]);
    const temp_data = useRef(0);
    const refs = useRef({});
    const [saveData, setSaveData] = useState(0);
    const [resetData, setResetData] = useState(0);
    refs.current[CPU] = useRef([0]);
    refs.current[TIME] = useRef([0]);
    refs.current[RAM] = useRef([0]);
    refs.current[DISK] = useRef([0]);
    refs.current[CPU_FREQ] = useRef([0]);
    refs.current[LOAD_AVG] = useRef([0]);
    refs.current[MEMORY] = useRef([0]);
    refs.current[TEMPERATURE] = useRef([0]);
    refs.current[BATTERY] = useRef([0]);
    refs.current[CORES] = useRef([0]);

    useEffect(() => {
        if (refs.current[CPU].current.length > 60) {
            refs.current[CPU].current.splice(0, 1)
            refs.current[RAM].current.splice(0, 1)
            refs.current[DISK].current.splice(0, 1)
            refs.current[CPU_FREQ].current.splice(0, 1)
            refs.current[LOAD_AVG].current.splice(0, 1)
            refs.current[MEMORY].current.splice(0, 1)
            refs.current[TEMPERATURE].current.splice(0, 1)
            refs.current[BATTERY].current.splice(0, 1)
            refs.current[CORES].current.splice(0, 1)
        }
    }, [time]);

    useEffect(() => {

        fetch("http://localhost:44361/api/dashboard/get-config") 
        .then(response => response.json())
        .then((data) => {
            setChartComponents(data)
            setChartComponentsCopy(data)
            getCurrTime(setTime)
            getCurrArr(refs.current[CPU], 'ReceiveIslemci');
            getCurrArr(refs.current[RAM], 'ReceiveRam');
            getCurrArr(refs.current[DISK], 'ReceiveDisk');
            getCurrArr(refs.current[CPU_FREQ], 'ReceiveCpuFreqData');
            getCurrArr(refs.current[LOAD_AVG], 'ReceiveLoadAvgData');
            getCurrArr(refs.current[MEMORY], 'ReceiveMemoryData');
            getCurrArr(refs.current[TEMPERATURE], 'ReceiveTemperatureData');
            getCurrArr(refs.current[BATTERY], 'ReceiveBatteryData');
            getCurrData(refs.current[CORES], 'ReceiveCoreData');
        })
        .catch(error => console.error(error));
        
    }, []);


    useEffect(async() => {
        if(saveData == 1) {
            let jsonString = JSON.stringify(chartComponents)
            await fetch('http://localhost:44361/api/dashboard/update-config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: jsonString,
            })
            .then(data => jsonString)

            setSaveData(0);
        }
       
    }, [saveData]);

    useEffect(async() => {
        
        if(resetData == 1) {
            
            let datas = []
            await fetch("http://localhost:44361/api/dashboard/reset-config") 
            .then(response => response.json())
            .then((data) => {
                datas = data})


            let jsonString = JSON.stringify(datas)
            await fetch('http://localhost:44361/api/dashboard/update-config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: jsonString,
            })
            .then(data => jsonString)

            setResetData(0);
            window.location.reload(true)
        }
    }, [resetData]);
    
    function removeItem(i) {
        setChartComponents((prevChartComponents) => {
            return prevChartComponents.filter((component) => component.i !== i);
        });
    }

return (
    <div>
        <div className='action-line'>
            <div className='station-button'>
                 <Stations items={[1, 2, 3]} setID={setActiveID} /> 
            </div>
            <div className='notification-button'>
                <NotificationController time={time} CPU_arr={refs.current[CPU].current} RAM_arr={refs.current[RAM].current} DISK_arr={refs.current[DISK].current} />
            </div>
            <div className='station' style={{ fontFamily: 'Century Gothic' }}>{activeID}.Station</div>
            <div className='add-chart-button'>
               <DropDown setChartComponents={setChartComponents} chartComps={chartComponents} setSaveData={setSaveData} setResetData={setResetData}/>
            </div>
        </div>
        <div className="colorDiv">
            <ResponsiveGridLayout
                layouts={{ lg: chartComponents }}
                breakpoints={{ lg: 2220, md: 996, sm: 912 }}
                cols={{ lg: 20, md: 16, sm: 8 }}
                rowHeight={100}
                width={2800}
                isResizable={true}
                onLayoutChange={(layout) => {
                        setChartComponents(
                            chartComponents.map((component) => {
                                let position = layout.find((c) => c.i === component.i);
                                let updatedComp = chartComponents.find((c) => c.i === component.i);
                                updatedComp.x = position.x;
                                updatedComp.y = position.y;
                                updatedComp.h = position.h;
                                updatedComp.w = position.w;
                                return updatedComp || component;
                            })
                        );
                }}>
                {chartComponents.map(component => {
                    if(component.name !== "TIME") {
                        temp_arr.current = refs.current[component.name].current;
                        temp_data.current = temp_arr.current[temp_arr.current.length - 1]
                    }
                    else {
                        temp_data.current = time;
                    }
                    return (<div key={component.i} className='chart' >
                        <span className="remove" onClick={() => removeItem(`${component.i}`)}>
                            x
                        </span>
                        {
                            renderComponents(component, activeID, time, temp_arr.current, temp_data.current, component.h, component.w, component.palette, component.dataType)
                        }
                    </div>);
                })}
            </ResponsiveGridLayout>
        </div>
    </div>
);
}

export default GraphDashboard;
