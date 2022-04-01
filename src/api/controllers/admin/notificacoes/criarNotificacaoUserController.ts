import { Request, Response } from "express";
import { CriarNotificacaoUserService } from "../../../services/admin/notificacoes/criarNotificacaoUserService";

export class CriarNotificacaoUserController{
  async handle(request:Request,response:Response){
    const destinoId = request.params.id;
    const {origemId, conteudo,tipo}= request.body;

    const criarNotificacaoUserService = new CriarNotificacaoUserService();
    const resp = await criarNotificacaoUserService.execute({destinoId,origemId, conteudo,tipo});

    response.json(resp)

  }
}