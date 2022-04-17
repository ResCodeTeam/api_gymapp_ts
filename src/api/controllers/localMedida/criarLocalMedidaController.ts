import { Request, Response } from "express";

export class CriarLocalMedidaController{
  async handle(request:Request, response:Response){
    const uid = response.locals.uid;
    const{descricao,unilado}=request.body;
    if(descricao===undefined||unilado===undefined){
      throw new Error("Pedido Invalido")
    }
    
  }
}