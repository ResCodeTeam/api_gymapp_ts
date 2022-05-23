import { Request, Response } from "express";
import { ImpedirIdentificacaoService } from "../../services/definicoes/impedirIdentificacaoservice";

export class ImpedirIdentificacaoController {
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;
    const { identificacoes } = request.body;

    try{
      if (uid === undefined || identificacoes === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const impedirIdentificacaoService = new ImpedirIdentificacaoService();
      const resp = await impedirIdentificacaoService.execute(uid, identificacoes);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
