import React from 'react'
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';

export default function Stations(props) {
    let key=0;
    return (
            <Dropdown title="Select Station">
                {props.items.map(station =>
                    <Dropdown.Item key={++key} onClick={()=>props.setID(station)}>{station}. Station</Dropdown.Item>
                )}
            </Dropdown>
    )
}
