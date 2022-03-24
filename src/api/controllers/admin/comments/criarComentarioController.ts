import { Request, Response } from "express";
import { CriarComentarioService } from "../../../services/admin/comments/criarComentarioService";


class CriarComentarioController{
    async handle(request:Request, response:Response){
        const postId = request.params.id;
        const {comentario,criadorId,data}=request.body;

        const criarComentarioService = new CriarComentarioService();
        const resp = await criarComentarioService.execute({postId,comentario,criadorId,data})
        response.json(resp)
    }
}

export{ CriarComentarioController }