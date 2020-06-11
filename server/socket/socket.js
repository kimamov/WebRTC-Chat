const handleUpgrade = require('./handleUpgrade');

module.exports = function initSocketServer(server) {
    const wss = new(require('ws')).Server({
        noServer: true,
        clientTracking: true
    });
    wss.on('connection', (ws, request, data) => {
        /* const userName = nameFromQuery(request); */
        ws.userName = "userName";
        ws.send(data);
        ws.on('message', data => {
            console.log(data);
            ws.send(data);
        })
    });
    server.on('upgrade', (request, socket, head) => handleUpgrade(request, socket, head, wss));
    return wss;
}