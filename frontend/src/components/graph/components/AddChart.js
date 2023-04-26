import React, {useRef} from 'react';
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';
import { TIME, CPU, MEMORY, CPU_FREQ, LOAD_AVG, DISK, BATTERY, TEMPERATURE, CORES, RADIAL_CHART, RAM, AREA_CHART, LINE_CHART, RADAR_CHART, TIME_CHART } from "../Constants";

function AddChart(props) {
	const mapArr = [CPU, RAM, DISK, CPU_FREQ, LOAD_AVG, BATTERY, TEMPERATURE]
	let key = 0;
	const dataType = useRef("Percent");
	

	function findType(dataName) {
		if(dataName === MEMORY)
			dataType.current = "Bytes"
		else if(dataName === CPU_FREQ)
			dataType.current = "Mhz"
		else if(dataName === TEMPERATURE)
			dataType.current = "Celcius"
	}

	function addItem(selectedChart, selectedType) {
		findType(selectedType);
		const height=2;
		const width=4;
		const maxRow = props.chartComps.reduce((max, item) => Math.max(max, item.y + item.h), 0);
		const maxCol = props.chartComps.reduce((max, item) => Math.max(max, item.x + item.w), 0);
		const position = findEmptySpot(props.chartComps, maxRow, maxCol, 4);
		let newComp = { i: (parseInt(props.chartComps.length) + 1).toString(), chartType: selectedChart, name: selectedType, x: position.x, y: position.y, w: width, h: height, palette: 'palette1', dataType: dataType.current };
		console.log(newComp)
		props.setChartComponents([...props.chartComps, newComp]);
	}

	function findEmptySpot(items, maxRows, maxCols, w) {
		const grid = Array.from({ length: maxRows }, () =>
			Array.from({ length: maxCols }, () => null)
		);
		
		items.forEach(item => {
			for (let row = item.y; row < item.y + item.h; row++) {
			  for (let col = item.x; col < item.x + item.w; col++) {
				if (!grid[row]) {
				  grid[row] = [];
				}
				grid[row][col] = item !== undefined ? item : { x: 0, y: Infinity };
			  }
			}
		  });

		for (let row = 0; row < maxRows; row++) {
			for (let col = 0; col <= maxCols - w; col++) {
				let isWSpace = true;
				for (let i = 0; i < w; i++) {
					if (col + i >= maxCols || grid[row][col + i] !== null) {
						isWSpace = false;
						break;
					}
				}
				if (isWSpace) {
					return { x: col, y: row };
				}
			}
		}
		
		return { x: 0, y: Infinity };
	}

	return (
			<Dropdown title="Settings">
				<Dropdown.Item key={++key} onClick={() => { props.setSaveData(1)}}>Save Layout</Dropdown.Item>
				<Dropdown.Item key={++key} onClick={() => { props.setResetData(1)}}>Reset Layout</Dropdown.Item>
				<Dropdown title="Add Chart" placement="leftStart" style={{ width: '100%', display: 'inline-block', textAlign: 'center', backgroundColor: '#F7F7FA' }} trigger="hover">
					<Dropdown.Item key={++key} onClick={() => { addItem(TIME_CHART, TIME); }}>Time Chart</Dropdown.Item>
					{mapArr.map((item => (
						<Dropdown placement="leftStart" style={{ width: '100%', display: 'inline-block', textAlign: 'center', backgroundColor: '#F7F7FA' }} trigger="hover" key={++key} title={item}>
							<Dropdown.Item key={++key} onClick={() => { addItem(LINE_CHART, item); }}>Line Chart</Dropdown.Item>
							<Dropdown.Item key={++key} onClick={() => { addItem(AREA_CHART, item); }}>Area Chart</Dropdown.Item>
							<Dropdown.Item key={++key} onClick={() => { addItem(RADIAL_CHART, item); }}>Radial Chart</Dropdown.Item>
						</Dropdown>
					)))}
					<Dropdown.Item key={++key} onClick={() => { addItem(RADAR_CHART, CORES); }}>Core Data</Dropdown.Item>
				</Dropdown>
			</Dropdown>
	)
}

export default AddChart;
