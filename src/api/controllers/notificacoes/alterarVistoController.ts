import { Request, Response } from "express";
import { AlterarVistoService } from "../../services/notificacoes/alterarVistoService";


export class AlterarVistoController{
    async handle(request:Request,response:Response){
        const destUid = response.locals.uid;
        const notiId = request.params.id;
        if(notiId === undefined || destUid === undefined){
            throw new Error("Pedido inválido")
        }

        const alterarVistoController = new AlterarVistoService();
        const resp = await alterarVistoController.execute({
            notiId,
            destUid
        });
        response.json(resp);
    }
}