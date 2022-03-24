import { Request, Response } from "express";
import { VerPostService } from "../../../services/admin/posts/verPostService";


class VerPostController{
    async handle(request:Request,response:Response){
        const verPostService = new VerPostService();
        const resp = await verPostService.execute();
        response.json(resp)
    }
}

export { VerPostController }

