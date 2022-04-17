import { Request, Response } from "express";
import { UpdateEstadoNotificacaoService } from "../../../services/posts/notificacoes/updateEstadoNotificacaoService"

export class UpdateEstadoNotificacaoController{
    async handle(request:Request,response:Response){
        let {userId, notiId}=request.body;
        if(userId === undefined || notiId === undefined){
            throw new Error("Pedido inválido")
        }

        const updateEstadoNotificacaoController = new UpdateEstadoNotificacaoService();
        const resp = await updateEstadoNotificacaoController.execute({
            userId,
            notiId,
        });
        response.json(resp);
    }
}