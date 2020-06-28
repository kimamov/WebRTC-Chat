import {checkAuth} from '../middlewares/middlewares'

module.exports= function initSocketServer(app){
    app.ws('/socket',checkAuth, (ws, req)=>{
        console.log("WS STUFF")
        console.dir(req.session)
        console.dir(req.user)
        ws.on('message', (message)=>{
            console.log(message)
        })
    })
}