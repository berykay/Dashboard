import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

export const warningNotification = (currNumber, name, sendNotification) => {
    if (sendNotification.current && currNumber > 50) {
        sendNotification.current = false;
        toast.error(
            <div>
                {name} is HIGH: {currNumber}% <br />-Time at: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            , {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
    }else if(!sendNotification.current && currNumber<50){
        sendNotification.current = true;
    }
}