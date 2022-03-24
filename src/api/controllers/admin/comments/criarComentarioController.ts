import { Request, Response } from "express";
import criarComentarioService from "../../../services/admin/comments/CriarComentarioService";



class CriarComentarioController{
    async handle(request:Request,response:Response){
        const post_id = request.params.id;
        const {comentario,criador_id,data}=request.body;
    
        const resp = await criarComentarioService(post_id,comentario,criador_id,data)
        response.json(resp)
    }
}

export{ CriarComentarioController }