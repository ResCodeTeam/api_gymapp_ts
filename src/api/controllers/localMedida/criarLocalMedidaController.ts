import { Request, Response } from "express";
import { CriarLocalMedidaService } from "../../services/localMedida/criarLocalMedidaService";

export class CriarLocalMedidaController{
  async handle(request:Request, response:Response){
    const uid = response.locals.uid;
    const marcaId = request.params.marcaId;
    const{descricao,unilado}=request.body;
    if(descricao===undefined||unilado===undefined){
      throw new Error("Pedido Invalido")
    }

    const criarLocalMedidaService = new CriarLocalMedidaService();
    const resp = await criarLocalMedidaService.execute(uid,marcaId,descricao,unilado)

    response.json(resp)
  }
}