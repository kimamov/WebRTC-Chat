const http = require('http');
const WebSocket = require('ws');

function getDataAsync(request) {
    return new Promise((resolve, reject) => setTimeout(() => {
        console.log(request);
        request.param ? resolve("succesfully connected") : reject("failed")
    }, 500));
}

const server = http.createServer();
const wss = new WebSocket.Server({
    noServer: true,
    clientTracking: true,

});

wss.on('connection', (ws, request, data) => {
    ws.send(data);
});

server.on('upgrade', async (request, socket, head) => {
    let data;

    try {
        data = await getDataAsync(request);
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
});

server.listen(5000);