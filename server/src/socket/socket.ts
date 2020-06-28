import { Http2Server } from "http2";
import * as WebSocket from 'ws';

const handleUpgrade = require('./handleUpgrade');


module.exports = function initSocketServer(server: Http2Server) {
    const wss = new WebSocket.Server({
        noServer: true,
        clientTracking: true
    });
    wss.on('connection', (ws, request, data) => {
        ws.user=request.user;
        ws.send(data);
        ws.on('message', data => {
            console.log(data+"_"+ws.user);
            ws.send(data);
            wss.clients.forEach(client=>{
                if(client.readyState===WebSocket.OPEN){
                    client.send(ws.user)
                }
            })
        })
    });
    server.on('upgrade', (request, socket, head) => handleUpgrade(request, socket, head, wss));
    return wss;
}