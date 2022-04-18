import { Request, Response } from "express";
import { SubmissaoDesafioService } from "../../../services/desafios/submissoes/submissaoDesafioService";

export class SubmissaoDesafioController{
  async handle(request:Request, response:Response){
    const desafioId = request.params.desafioId;
    const treinadorId = response.locals.uid;
  
    const {uid,valor,ginasioId}=request.body;
    if(uid === undefined || valor === undefined || treinadorId === undefined || ginasioId === undefined){
      throw new Error("Pedido inválido")
    }

    console.log(desafioId);
    const submissaoDesafioService = new SubmissaoDesafioService();
    const resp = await submissaoDesafioService.execute({desafioId,uid,valor,treinadorId,ginasioId})
    response.json(resp)
  }
}