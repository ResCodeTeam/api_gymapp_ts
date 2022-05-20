import { Request, Response } from "express";
import { RemoverPostService } from "../../services/posts/removerPostService";

class RemoverPostController {
    async handle(request: Request, response: Response) {
        const uId = request.params.userId;
        const post_id = request.params.id;
        if (uId === undefined || post_id === undefined) {
            response.json("Pedido inválido").status(500);
          }

    const removerPostService = new RemoverPostService();
    const resp = await removerPostService.execute(uId, post_id);
    response.json(resp.data).status(resp.status);
    }
}
export { RemoverPostController }

