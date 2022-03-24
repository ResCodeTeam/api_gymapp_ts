import { Request, Response } from "express";
import { CriarComentarioService } from "../../../services/admin/comments/criarComentarioService";


class CriarComentarioController{
    async handle(request:Request, response:Response){
        const post_id = request.params.id;
        const {comentario,criador_id,data}=request.body;

        const criarComentarioService = new CriarComentarioService();
        const resp = await criarComentarioService.execute({post_id,comentario,criador_id,data})
        response.json(resp)
    }
}

export{ CriarComentarioController }