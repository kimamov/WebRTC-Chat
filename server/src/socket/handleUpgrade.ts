const http = require('http');
import {sessionParser} from '../config'

module.exports = async function handleUpgrade(request, socket, head, wss) {
    let data;
    console.dir(request.headers)

    try {
        sessionParser(request, {}, ()=>{
            console.dir(request.session)
            console.dir(request.session.cookie)

        })
        data = await Promise.resolve("hello world");
    } catch (error) {
        const res = new http.ServerResponse({
            httpVersionMajor: 1,
            httpVersionMinor: 1
        });

        res.assignSocket(socket);
        res.shouldKeepAlive = false;

        res.on('finish', () => {
            res.detachSocket(socket); // Not strictly needed.
            socket.destroySoon();
        });

        res.writeHead(500, 'internal server error');
        res.end();
        return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request, data);
    });
}