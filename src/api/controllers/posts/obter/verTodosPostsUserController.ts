import { Request, Response } from "express";
import { VerTodosPostsUserService } from "../../../services/posts/obter/verTodosPostsUserService";

export class VerTodosPostsUserController{
    async handle(request:Request,response:Response){
        const userId = response.locals.uid;

        const verTodosPostsUserService = new VerTodosPostsUserService();
        const resp = await verTodosPostsUserService.execute(userId);
        response.json(resp)
    }
}