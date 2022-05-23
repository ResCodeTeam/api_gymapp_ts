import { Request, Response } from "express";
import { RemoverPostService } from "../../services/posts/removerPostService";

class RemoverPostController {
    async handle(request: Request, response: Response) {
        const uId = request.params.userId;
        const post_id = request.params.id;
        if (uId === undefined || post_id === undefined) {
            response.status(500).json("Pedido inválido");
        }

        const removerPostService = new RemoverPostService();
        const resp = await removerPostService.execute(uId, post_id);
        response.status(resp.status).json(resp.data);
    }
}
export { RemoverPostController }

