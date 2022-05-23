import { Request, Response } from 'express'
import { EditarMencoesService } from '../../services/definicoes/editarMencoesService';

export class EditarMencoesController {
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;
    const { mencoes } = request.body;
    if (uid === undefined || mencoes === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const editarMencoesService = new EditarMencoesService();
    const resp = await editarMencoesService.execute(uid, mencoes);

    response.status(resp.status).json(resp.data);

  }
}