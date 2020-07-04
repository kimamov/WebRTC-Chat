import { Http2Server } from "http2";
//import * as WebSocket from 'ws';
//import { WebSocket } from 'ws'
const WebSocket = require('ws')

const handleUpgrade = require('./handleUpgrade');

export const UserMap = new Map<string, any>()

interface SocketMessage {
    type: string
    payload: any
}

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
        ws.on('message', (message: SocketMessage) => {
            switch (message.type) {
                case 'fffer':
                    sendOffer(message.payload, ws);
                    break;
                case 'answer':
                    answerOffer(message.payload, ws);
                    break;
                case 'iceCandidate':
                    handleIceCandidate(message.payload, ws);
                    break;
                default:
                    ws.send({
                        type: 'message',
                        data: 'server is listening but this is no valid message type :)'
                    })

            }
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

function sendOffer(payload, ws) {
    // sends an webRTC offer to a target socket if it is in the UserMap
    const targeSocket = UserMap.get(payload.target);
    if (targeSocket) {
        targeSocket.send({
            type: 'offer',
            data: payload
        });
        return ws.send({
            type: 'sendOffserSucces',
            data: payload
        })
    }
    ws.send({
        type: 'sendOfferFail',
        data: payload
    })
}

function answerOffer(payload, ws) {
    // sends the answer to an webRTC offer to a target socket if it is in the UserMap
    // not much is stopping you from calling this the wrong way but a connection will not be formed
    // if there was no previous offer
    const targeSocket = UserMap.get(payload.target);
    if (targeSocket) {
        targeSocket.send({
            type: 'answer',
            data: payload
        });
        return ws.send({
            type: 'answerOffserSucces',
            data: payload
        })
    }
    ws.send({
        type: 'answerOfferFail',
        data: payload
    })
}

function handleIceCandidate(payload, ws) {
    const targetSocket = UserMap.get(payload.target);
    if (targetSocket) {
        targetSocket.send({
            type: 'iceCandidate',
            data: payload
        });
        return ws.send({
            type: 'iceSucces',
            data: payload
        })
    }
    ws.send({
        type: 'iceFail',
        data: payload
    })
}