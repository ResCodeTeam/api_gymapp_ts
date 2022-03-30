import { Request, Response } from "express";
import { generateSessionToken } from "../../helpers/jwtHelpers";
require('dotenv').config({ path: __dirname+'/.env' });

export class GerarTokenController{
    async handle(request:Request, response:Response){
        const userId = request.params.id;
        
        const token = await generateSessionToken(userId)

        response.json({token})


    }
}