import express, {Request, Response, Router} from 'express';

const ROUTER: Router = express.Router();

//simple get request first 

ROUTER.route("/home").get((req: Request, res: Response) => {
    try{
        res.statusCode = 200;
        
        res.json({
            msg: "welcome to the new world, chat app",
            status: "OK"
        })
    }catch(err){
        console.log(`there's an error in compilation ${err}`)
    }
})


export default ROUTER;