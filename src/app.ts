import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const app = express();

//Rotas
import { adminRouter } from "./api/routes/adminRoute";
import auth_route from "./api/routes/auth_route";


app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/auth", auth_route);

app.use((error:Error,request:Request,response:Response,next:NextFunction)=>{
    console.log(error.message)
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
