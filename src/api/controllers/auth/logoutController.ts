import { Request, Response } from "express";
import { LogoutService } from "../../services/auth/logoutService";

export class LogoutController{
    async handle(request:Request, response:Response){
        const userId = response.locals.uid;
        const token = response.locals.token;
        const logoutService = new LogoutService();
        const resp = await logoutService.execute(userId,token);
        response.json(resp)
    }
}