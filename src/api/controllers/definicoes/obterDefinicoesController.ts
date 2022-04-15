import { Request, Response } from "express";
import { ObterDefinicoesService } from "../../services/definicoes/obterDefinicoesService";

export class ObterDefinicoesController{
  async handle(request:Request, response:Response){
    const uid = response.locals.uid;

    const obterDefinicoesService = new ObterDefinicoesService();

    const resp = await obterDefinicoesService.execute(uid);
    response.json(resp);
    
  }
}