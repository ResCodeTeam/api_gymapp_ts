import { Request, Response } from "express";
import { EditarPublicacaoService } from "../../services/posts/editarPublicacoesService";


export class EditarPublicacaoController {
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const publicacaoId = request.params.id;

    const { descricao } = request.body;
    if (uId === undefined || publicacaoId === undefined || descricao === undefined) {
      response.json("Pedido inválido").status(500);
    }
    let newData = new Date(Date.now());
    const editarPublicacaoService = new EditarPublicacaoService();

    const resp = await editarPublicacaoService.execute({
      uId,
      publicacaoId,
      newData,
      descricao
    });

    response.json(resp.data).status(resp.status);
  }
}
