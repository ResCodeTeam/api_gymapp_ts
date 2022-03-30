import { Request, Response } from "express";
import { VerTodosPostsUserService } from "../../../../services/all/posts/obter/verTodosPostsUserService";

export class VerTodosPostsUserController{
    async handle(request:Request,response:Response){
        const userId = request.params.id;

        const verTodosPostsUserService = new VerTodosPostsUserService();
        const resp = await verTodosPostsUserService.execute(userId);
        response.json(resp)
    }
}