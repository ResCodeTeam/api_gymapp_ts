import { Request, Response } from "express";
import { CriarNotificacaoGinasioService } from "../../../services/admin/notificacoes/criarNotificacaoGinasioService"

export class CriarNotificacaoGinasioController{
    async handle(request:Request,response:Response){
        let {userId, ginasioId, conteudo, data, tipo}=request.body;
        data = new Date(data);
        console.log(data);

        const criarNotificacaoMarcarController = new CriarNotificacaoGinasioService();
        const resp = await criarNotificacaoMarcarController.execute({
            userId,
            ginasioId,
            conteudo,
            data,
            tipo
        });
        response.json(resp);
    }
}