import { ConnectedSockets } from '../index';
import { Socket } from 'net';

export interface SocketMessage {
    type: string
    payload: any
}

export const printActiveSocketIds = (SocketUserMap) => {
    console.log(SocketUserMap.keys())
}

export function handleSocketMessage(message: any, ws: any) {
    // most messages will be strings of stringified json but some will be binary data as blobs / arraybuffers
    if (typeof message === 'string') return handleStringMessage(message, ws);
    handleBinaryMessage(message, ws);
}

function handleStringMessage(message: string, ws: any) {
    try {
        // if the string is valid json pass it down to the json handler
        const json = JSON.parse(message);
        handleJsonMessage(json, ws)
    } catch (error) {
        // otherwise it is just a string lets handle it as such (actually not much I do with strings lets just send them back as test)
        console.log(error);
        console.log(message);
        ws.send(message);
    }
}

function handleJsonMessage(json: SocketMessage, ws) {
    // actually use the json to handle different message types
    switch (json.type) {
        case 'offer':
            sendOffer(json.payload, ws);
            break;
        case 'answer':
            answerOffer(json.payload, ws);
            break;
        case 'iceCandidate':
            handleIceCandidate(json.payload, ws);
            break;
        case 'getUsers':
            getUsers(json.payload, ws);
            break;
        case 'directMessage':
            handleDirectMessage(json.payload, ws);
            break;
        default:
            sendJsonTo(ws, {
                type: 'message',
                payload: 'server is listening but this is no valid message type :)'
            })
    }
}

function handleBinaryMessage(message: any, ws: any) {
    // not handeling any binary for now
    ws.send(jsonMessage('notSupported', 'binary data is currently not supported.... please try sending strings or stringified JSON objects'));
}



function sendOffer(payload, ws) {
    // sends an webRTC offer to a target socket if it is in the UserMap
    console.dir(payload)
    const targetSocket = ConnectedSockets.get(String(payload.target));
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
    const targetSocket = ConnectedSockets.get(String(payload.target));
    console.log(payload.target)
    console.log(ConnectedSockets.keys())
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
    const targetSocket = ConnectedSockets.get(payload.target);
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

interface directMessagePayload {
    from: string,
    to: string,
    data: any,
    timeStamp: number
}

interface directMessage  {
    type: 'directMessage',
    payload: directMessagePayload
}

function handleDirectMessage(payload, ws) {
    const targetSocket = ConnectedSockets.get(payload.to);
    const {id}=ws.user;
    if(!id){
        ws.send(jsonMessage('directMessageFailed', {
            from: 'unknown_user',
            to: payload.to,
            data: 'could not get user id'
        })) 
    }
    if(targetSocket){
        const messageObject: directMessage={type: 'directMessage', payload: {
            from: id,
            to: payload.to,
            data: payload.data,
            timeStamp: Date.now()
        }}
        // send message to target user
        targetSocket.send(JSON.stringify(messageObject))
        // return message to sending usert. TODO create custom event to save data
        //messageObject.payload.ownMessage=true;
        return  ws.send(jsonMessage('directMessageSucces', {
            from: id,
            to: payload.to,
            data: payload.data,
            timeStamp: Date.now()
        }))
        
    }
    ws.send(jsonMessage('directMessageFailed', {
        from: id,
        to: payload.to,
        data: 'could not find target user :( you can only message online users'
    }))
}

const getUsers = async (payload, ws) => {
    const allActiveUsers = []
    ConnectedSockets.forEach(socket => {
        if (socket.user) allActiveUsers.push(socket.user);
    })
    ws.send(jsonMessage('returnUsers', allActiveUsers))
}

const sendJsonTo = (targetSocket, objectData: object) => targetSocket.send(JSON.stringify(objectData))

const jsonMessage = (type: string, payload: any): string => JSON.stringify({ type: type, payload: payload })


export const closeWebSocket = (ws: any) => {
    //ws.send(jsonMessage('socketClosing', 'closing your socket connection gracefully'))
    ConnectedSockets.delete(ws);
    console.log(ConnectedSockets.keys())
    ws.close();
}

export const closeWebSocketWithId = (userId: string) => {
    // casting to string bullshit will be fixed once i switch id to uuid
    const id = String(userId);
    if (!id) return;
    const socket = ConnectedSockets.get(id)
    socket.close();
    ConnectedSockets.delete(id);
}
