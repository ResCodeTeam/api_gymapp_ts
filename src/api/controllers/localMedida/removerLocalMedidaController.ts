import { Request, Response } from "express";
import { RemoverLocalMedidaService } from "../../services/localMedida/removerLocalMedidaService";

export class RemoverLocalMedidaController{
  async handle(request:Request, response:Response){
    const uid = response.locals.uid;
    const localId = request.params.id;
    const marcaId = request.params.marcaId;

    const removerLocalMedidaService = new RemoverLocalMedidaService();
    const resp = await removerLocalMedidaService.execute(uid,marcaId,localId)

    response.json(resp)
  }
}