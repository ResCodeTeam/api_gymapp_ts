import { Request, Response } from "express";
import { RemoverSubmissaoDesafioService } from "../../../services/desafios/submissoes/removerSubmissaoDesafioService";

export class RemoverSubmissaoDesafioController{
  async handle(request:Request, response:Response){
    const uid = response.locals.uid;
    const submissaoId = request.params.id

    const removerSubmissaoDesafioService = new RemoverSubmissaoDesafioService();
    const resp = await removerSubmissaoDesafioService.execute(uid,submissaoId)

    response.json(resp)
  }
}