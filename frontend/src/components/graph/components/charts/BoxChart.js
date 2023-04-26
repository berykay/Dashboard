import React, { useState, useEffect } from 'react'

export default function BoxChart(props) {

  const [myData, setMyData] = useState('0%')
  const [seeGraph, setSeeGraph] = useState(true);

  const disableGraph = (seeItem, setSeeItem) => (e) => {
    setSeeItem(!seeItem)
  }

  useEffect(() => {
    setMyData(props.dataArr[props.dataArr.length - 1]);
  }, [undefined, props.activeID])

  useEffect(() => {
    setMyData(props.dataArr[props.dataArr.length - 1])
  }, [props.time])

  return (
    <div className="centered" >
      <button className="buttonGraph" onClick={disableGraph(seeGraph, setSeeGraph)}>{seeGraph ? <>See Active </> : <>See Free</>}</button>
      <div style={{ fontSize: '10px', color: "white", fontWeight: 'bold' }}>{seeGraph? "Free ": "Active "}{props.name}</div>
      <div className='centeredText' style={{ fontSize: '15px', color: seeGraph? "green":"red", fontWeight: 'bold' }}>{seeGraph ? 100-myData: myData}%</div>
    </div>
  )
}

