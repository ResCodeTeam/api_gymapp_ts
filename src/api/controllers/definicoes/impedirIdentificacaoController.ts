import { Request, Response } from 'express'
import { ImpedirIdentificacaoService } from '../../services/definicoes/impedirIdentificacaoservice';


export class ImpedirIdentificacaoController {
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;
    const { identificacoes } = request.body;
    if (uid === undefined || identificacoes === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const impedirIdentificacaoService = new ImpedirIdentificacaoService();
    const resp = await impedirIdentificacaoService.execute(uid, identificacoes);

    response.json(resp.data).status(resp.status);

  }
}