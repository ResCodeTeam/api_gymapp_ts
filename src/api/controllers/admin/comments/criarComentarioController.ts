import { Request, Response } from "express";
import criar_comentario_service from "../../../services/admin/comments/criar_comentario_service";



class CriarComentarioController{
    async handle(request:Request,response:Response){
        const post_id = request.params.id;
        const {comentario,criador_id,data}=request.body;
    
        const resp = await criar_comentario_service(post_id,comentario,criador_id,data)
        response.json(resp)
    }
}

export{ CriarComentarioController }