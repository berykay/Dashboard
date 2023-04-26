import React from 'react'
import timeCalculator from '../../widgets/TimeCalculate'

export default function TimeChart(props) {
  return (
    <div className="centered" >
      <div style={{ fontSize: '16px', color: "white", fontWeight: 'bold' }}>Time</div>
      <div className='centeredText' style={{ fontSize: '15px', color: "cyan", fontWeight: 'bold' }}>{timeCalculator(props.time)}</div>
    </div>
  )
}