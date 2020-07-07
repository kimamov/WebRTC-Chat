import { Http2Server } from "http2";
import {ConnectedSockets} from '../index';
import {printActiveSocketIds, handleSocketMessage} from './socketUtil'
const WebSocket = require('ws')

const handleUpgrade = require('./handleUpgrade');

/* TODO
    -get types for WebSocket ws library does not use typescript but there seem to be third party types
    -delete socket if user logs out
*/
module.exports = function initSocketServer(server: Http2Server) {
    const wss = new WebSocket.Server({
        noServer: true,
    });
    wss.on('connection', (ws, request, data) => {
        ws.user = request.user;
        if (ConnectedSockets.has(String(request.user.id))) {
            // if socket with the same key exists delete it
            // only for local testing
            ConnectedSockets.delete(String(request.user.id))
        }
        ConnectedSockets.set(String(request.user.id), ws);
        /* tell all users that are your friends and online that you are online  */
        printActiveSocketIds(ConnectedSockets);
        //ws.send(data);
        ws.on('message', (incomingMessage: any) => {
            handleSocketMessage(incomingMessage, ws);
        })
    });
    server.on('upgrade', (request, socket, head) => handleUpgrade(request, socket, head, wss));
    return wss;
}


