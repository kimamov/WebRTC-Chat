import { Http2Server } from "http2";
import { User } from "../entity/User";
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
        if (UserMap.has(String(request.user.id))) {
            // if socket with the same key exists delete it
            // only for local testing
            UserMap.delete(String(request.user.id))
        }
        UserMap.set(String(request.user.id), ws);
        /* tell all users that are your friends and online that you are online  */
        printActiveSocketIds(UserMap);
        //ws.send(data);
        ws.on('message', (incomingMessage: string) => {
            ws.send(JSON.stringify({ message: "you passed" }));
            try {
                const message = JSON.parse(incomingMessage);
                switch (message.type) {
                    case 'offer':
                        sendOffer(message.payload, ws);
                        break;
                    case 'answer':
                        answerOffer(message.payload, ws);
                        break;
                    case 'iceCandidate':
                        handleIceCandidate(message.payload, ws);
                        break;
                    default:
                        sendJsonTo(ws, {
                            type: 'message',
                            data: 'server is listening but this is no valid message type :)'
                        })

                }
            } catch (e) {
                console.log(e);
                console.log("failed to parse json");
                return;
            }
            /* UserMap.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(ws.user.username)
                }
            }) */
        })
    });
    server.on('upgrade', (request, socket, head) => handleUpgrade(request, socket, head, wss));
    return wss;
}

const printActiveSocketIds = (SocketUserMap) => {
    console.log(SocketUserMap.keys())
}

function sendOffer(payload, ws) {
    // sends an webRTC offer to a target socket if it is in the UserMap
    console.dir(payload)
    const targetSocket = UserMap.get(String(payload.target));
    console.log(targetSocket.user)
    if (targetSocket) {
        sendJsonTo(targetSocket, {
            type: 'offer',
            payload
        });
        return sendJsonTo(ws, {
            type: 'sendOffserSucces',
            payload
        })
    }
    sendJsonTo(ws, {
        type: 'sendOfferFail',
        payload
    })
}

function answerOffer(payload, ws) {
    // sends the answer to an webRTC offer to a target socket if it is in the UserMap
    // not much is stopping you from calling this the wrong way but a connection will not be formed
    // if there was no previous offer
    const targetSocket = UserMap.get(String(payload.target));
    console.log(payload.target)
    console.log(UserMap.keys())
    console.log(targetSocket.user)
    if (targetSocket) {
        sendJsonTo(targetSocket, {
            type: 'answer',
            payload
        });
        return sendJsonTo(ws, {
            type: 'answerOffserSucces',
            payload
        })
    }
    sendJsonTo(ws, {
        type: 'answerOfferFail',
        payload
    })
}

function handleIceCandidate(payload, ws) {
    const targetSocket = UserMap.get(payload.target);
    if (targetSocket) {
        sendJsonTo(targetSocket, {
            type: 'iceCandidate',
            payload
        })
        sendJsonTo(ws, {
            type: 'iceSucces',
            payload
        })
    }
    sendJsonTo(ws, {
        type: 'iceFail',
        payload
    })
}

const sendJsonTo = (targetSocket, objectData: object) => targetSocket.send(JSON.stringify(objectData))