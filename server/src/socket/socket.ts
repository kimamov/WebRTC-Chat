import { Http2Server } from "http2";
//import * as WebSocket from 'ws';
//import { WebSocket } from 'ws'
const WebSocket = require('ws')

const handleUpgrade = require('./handleUpgrade');

export const UserMap = new Map<string, any>()

module.exports = function initSocketServer(server: Http2Server) {
    const wss = new WebSocket.Server({
        noServer: true,
        /* clientTracking: true */
    });
    wss.on('connection', (ws, request, data) => {
        ws.user = request.user;
        UserMap.set(request.user.id, ws);
        /* tell all users that are your friends and online that you are online  */
        console.log(UserMap)
        //ws.send(data);
        ws.on('message', data => {
            console.log(data + "_" + ws.user);
            ws.send(data);
            UserMap.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(ws.user.username)
                }
            })
        })
    });
    server.on('upgrade', (request, socket, head) => handleUpgrade(request, socket, head, wss));
    return wss;
}