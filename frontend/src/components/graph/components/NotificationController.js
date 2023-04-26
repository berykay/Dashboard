import React, { useRef, useEffect } from 'react'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { CPU, DISK, RAM } from '../Constants';
import { warningNotification } from '../widgets/Notification';
import { useState } from 'react';

export default function NotificationController(props) {
  const [seeNotification, setSeeNotification] = useState(true)
  const send1 = useRef(true);
  const send2 = useRef(true);
  const send3 = useRef(true);

  useEffect(() => {
    warningNotification(props.CPU_arr[props.CPU_arr.length - 1], CPU, send1)
    warningNotification(props.RAM_arr[props.RAM_arr.length - 1], RAM, send2)
    warningNotification(props.DISK_arr[props.DISK_arr.length - 1], DISK, send3)
  }, [props.time])

  const handleNotification = () => {
    setSeeNotification(!seeNotification);
  };

  return (
    <div>
      <button onClick={handleNotification}  style={{backgroundColor: 'transparent' ,color:'white', fontFamily: "Century Gothic", fontSize: "14px"}}>
        {seeNotification ? <>Hide Notifications</> : <>Show Notifications</>}</button>
      <div>
        { seeNotification && 
          <ToastContainer
            position="bottom-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
            style={{ bottom: "60px", fontFamily: "Century Gothic" }}
          />
        }
      </div>
    </div>

  )
}
