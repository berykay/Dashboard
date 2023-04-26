import { HubConnectionBuilder } from '@microsoft/signalr';


const hubConnection = new HubConnectionBuilder().withUrl("http://localhost:44361/chatHub").build();

hubConnection.onreconnecting((()=>console.log('tekrar baglanti kuruluyor')));
hubConnection.onreconnected((()=>console.log('tekrar baglanti kuruldu')));

hubConnection.start().then(()=>{
    console.log('baglanti kuruldu');
}).catch(err=>console.log('connection failed: ',err));


export default hubConnection;