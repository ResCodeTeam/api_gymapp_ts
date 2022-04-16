import { Request, Response } from "express";
import { CriarExercicioService } from "../../services/exercicios/criarExercicioService";

export class CriarExercicioController{
  async handle(request:Request, response:Response){
    const {nome, descricao, autor,isTempo, imagens, musculos}= request.body;
    if(nome === undefined || descricao === undefined || autor === undefined || isTempo === undefined || imagens === undefined || musculos === undefined){
      throw new Error("Pedido inválido")
    }

    const criarExercicioService = new CriarExercicioService();
    const resp = await criarExercicioService.execute({nome, descricao, autor,isTempo, imagens, musculos});

    response.json(resp)
  }
}