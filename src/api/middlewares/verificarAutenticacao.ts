import { NextFunction, Request, Response } from "express";
import { getUserByID } from "../helpers/dbHelpers";
require('dotenv').config({ path: __dirname+'/.env' });
import { verify, decode } from 'jsonwebtoken';

export async function verificarAutenticacao(request:Request,response:Response,next:NextFunction){
    const auth = request.headers.authorization;
    if(!auth){
        throw new Error("Token invalido")
    }

    const[,token]= auth.split(" ");
    
    //verificar se o token é válido
    verify(token, process.env.SECRET_KEY_TOKEN);
    
    //obter id do user
    let uid = decode(token)['sub'].toString();

    //verificar se o user existe
    const user = await getUserByID(uid)
    if(!user){
        throw new Error("User inexistente")
    }


    const refresh_token = user.refresh_token
    if(!refresh_token){
        throw new Error("Token invalido")
    }
    
    next();
    
}