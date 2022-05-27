import { Request, Response } from "express";
import { VerTodosPostsService } from "../../../services/posts/obter/verTodosPostsService";



class VerTodosPostsController {
    async handle(request: Request, response: Response) {
        const userId = request.params.userId;
        const verPostService = new VerTodosPostsService();
        const resp = await verPostService.execute(userId);
        response.status(resp.status).json(resp.data);
    }
}

export { VerTodosPostsController }

