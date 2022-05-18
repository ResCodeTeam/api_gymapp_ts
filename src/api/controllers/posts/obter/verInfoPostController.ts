import { Request, Response } from "express";
import { VerInfoPostService } from "../../../services/posts/obter/verInfoPostService";

export class VerInfoPostController{
    async handle(request:Request, response:Response){
        const postId = request.params.id;

        const verInfoPostService = new VerInfoPostService();
        const resp = await verInfoPostService.execute(postId)
        
        response.json(resp.data).status(resp.status);
    }
}