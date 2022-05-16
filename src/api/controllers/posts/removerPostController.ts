import { Request, Response } from "express";
import {RemoverPostService} from "../../services/posts/removerPostService";

class RemoverPostController{
    async handle(request:Request, response:Response){
        const uId = request.params.userId;
        const post_id = request.params.id;

    const removerPostService = new RemoverPostService();
    const resp = await removerPostService.execute(uId, post_id);
    response.json(resp)
    }
}
export{ RemoverPostController }

