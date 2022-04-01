import { Request, Response } from "express";
import { CriarGostoService } from "../../../services/all/gostosPosts/criarGostoService";

export class CriarGostoController{
  async handle(request:Request, response:Response){
    const postId = request.params.id;
    const {criadorId}=request.body;
    const criarGostoController = new CriarGostoService();
    const resp = await criarGostoController.execute(postId,criadorId);
    response.json(resp)
  }
}