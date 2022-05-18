import { Request, Response } from "express";
import { CriarNotificacaoMarcaService } from "../../services/notificacoes/criarNotificacaoMarcaService"

export class CriarNotificacaoMarcaController{
    async handle(request:Request,response:Response){
        const userId = request.params.adminId;
        const marcaId = request.params.marcaId;
        let {conteudo, tipo}=request.body;
        if(marcaId === undefined || conteudo === undefined || tipo === undefined){
            throw new Error("Pedido inválido")
        }
        
        const criarNotificacaoMarcaService = new CriarNotificacaoMarcaService();
        const resp = await criarNotificacaoMarcaService.execute({
            userId,
            marcaId,
            conteudo,
            tipo
        });
        response.json(resp.data).status(resp.status);
    }
}