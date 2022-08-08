import http from 'http';
import express, {Application, Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import ROUTER from './routes/router';
import {Server} from 'socket.io';
import cors from 'cors';
dotenv.config()
//global constant
const APP: Application = express();
const SERVER = http.createServer(APP);
const IO = new Server(SERVER, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


APP.use(express.json());
APP.use(cors());

//404 handler

function unexistingRoute(req: Request, res: Response, next: NextFunction){
    
    res.statusCode = 404;
    res.json({
        msg: "sorry the route does not exist",
        status: "route not found"
    })
    
    next();
}

//default runner

APP.use("/api", ROUTER);

APP.use("*", unexistingRoute);


IO.on('connection', (socket) => {
    console.log(`connection established`);
   //the socket for the chatting palatform
   socket.on("twad packet", (nwTwad) => {
    IO.emit("twad packet", nwTwad)
   })
    
    
    //disconnect socket
    socket.on('disconnect', () => {
        console.log(`socket disconnected`);
    })
})

const port = process.env.PORT || 8001;

SERVER.listen(port, () => {
    console.log(`server running on port ${port}`)
})