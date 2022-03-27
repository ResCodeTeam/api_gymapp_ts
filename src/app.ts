import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const app = express();

//Rotas
import { adminRouter } from "./api/routes/adminRoute";
import {authRouter} from "./api/routes/authRoute";
import dotenv from "dotenv";
dotenv.config()

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());



app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/auth", authRouter);

app.use((error:Error,request:Request,response:Response,next:NextFunction)=>{

    return response.json({
        status:"Error",
        message:error.message
    })
})


const PORT =process.env.PORT||5000;
app.listen(PORT, ()=>{
    console.log(`Running! on port: ${PORT}`)
});



export { app };
