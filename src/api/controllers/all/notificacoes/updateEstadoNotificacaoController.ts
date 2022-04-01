import { Request, Response } from "express";
import { UpdateEstadoNotificacaoService } from "../../../services/all/notificacoes/updateEstadoNotificacaoService"

export class UpdateEstadoNotificacaoController{
    async handle(request:Request,response:Response){
        let {userId, notiId}=request.body;

        const updateEstadoNotificacaoController = new UpdateEstadoNotificacaoService();
        const resp = await updateEstadoNotificacaoController.execute({
            userId,
            notiId,
        });
        response.json(resp);
    }
}