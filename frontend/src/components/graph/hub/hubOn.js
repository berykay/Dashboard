import hubConnection from "./hub";

export function getCurrTime(setTime) {
    hubConnection.on("ReceiveTime", (newNumber) => {
        setTime(newNumber);
    });
}

export function getCurrArr(arr, receiveName) {
    hubConnection.on(receiveName, (newNumber) => {
        arr.current.push(newNumber);
    });
}

export function getCurrData(data, receiveName) {
    hubConnection.on(receiveName, (newNumber) => {
        data.current = newNumber;
    });
}

/* ActiveID function */
/* export function getCurrArr(arr, id, receiveName) {
    hubConnection.on(receiveName+id, (newNumber) => {
        arr.current.push(newNumber);
    });
} */