import { Request, Response } from "express";
import { CriarNotificacaoGinasioService } from "../../../services/admin/notificacoes/criarNotificacaoGinasioService";

export class CriarNotificacaoGinasioController{
    async handle(request:Request,response:Response){
        const {userId, ginasioId, conteudo, tipo}=request.body;

        const criarNotificacaoMarcarController = new CriarNotificacaoGinasioService();
        const resp = await criarNotificacaoMarcarController.execute({
            userId,
            ginasioId,
            conteudo,
            tipo
        });
        response.json(resp);
    }
}