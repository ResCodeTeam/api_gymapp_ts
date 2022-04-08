import "express-async-errors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"


const app = express();

//Rotas
import { adminRouter } from "./api/routes/adminRoute";
import { treinadorRouter } from "./api/routes/treinadorRoute";
import {authRouter} from "./api/routes/authRoute";

import { backendRouter } from "./api/routes/backendRoute";
import { allRouter } from "./api/routes/allRoute";
import { alunoRouter } from "./api/routes/alunoRoute";

dotenv.config()

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/treinador", treinadorRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", allRouter);
app.use("/api/v1/backend", backendRouter);
app.use("/api/v1/aluno", alunoRouter);

app.use((error:Error,request:Request,response:Response,next:NextFunction)=>{
    console.log(error)
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
