import { Request, Response } from "express";
import { VerNotificacoesService } from "../../services/notificacoes/verNotificacoesService";

export class VerNotificacoesController{
    async handle(request:Request,response:Response){
        const origemId = response.locals.uid;

        const verNotificacoesService = new VerNotificacoesService();
        const resp = await verNotificacoesService.execute(origemId);
        response.json(resp)
    }
}