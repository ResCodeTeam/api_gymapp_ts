import { Request, Response} from "express";
import { CriarComentarioService } from "../../../services/posts/comments/criarComentarioService";

export class CriarComentarioController{
    async handle(request : Request, response : Response) {
        const criarComentarioService = new CriarComentarioService();
        const publicacao_id = request.params.id;
        const {comentario,criador_id,identificacao}=request.body;

        const resp = await criarComentarioService.execute(publicacao_id,comentario,criador_id,identificacao)

        response.json(resp);

    }
}