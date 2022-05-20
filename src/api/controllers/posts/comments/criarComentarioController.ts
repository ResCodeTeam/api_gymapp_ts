import { Request, Response } from "express";
import { CriarComentarioService } from "../../../services/posts/comments/criarComentarioService";

export class CriarComentarioController {
    async handle(request: Request, response: Response) {
        const publicacao_id = request.params.id;
        const criador_id = request.params.userId;
        const { comentario, identificacao } = request.body;
        if (publicacao_id === undefined || criador_id === undefined || comentario === undefined || identificacao === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const criarComentarioService = new CriarComentarioService();
        const resp = await criarComentarioService.execute(publicacao_id, comentario, criador_id, identificacao)

        response.json(resp.data).status(resp.status);

    }
}