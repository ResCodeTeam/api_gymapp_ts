import { Request, Response } from "express";
import { CriarExercicioService } from "../../../services/treinador/exercicios/criarExercicioService";

export class CriarExercicioController{
  async handle(request:Request, response:Response){
    const {nome, descricao, autor,isTempo, imagens, musculos}= request.body;

    const criarExercicioService = new CriarExercicioService();
    const resp = await criarExercicioService.execute({nome, descricao, autor,isTempo, imagens, musculos});

    response.json(resp)
  }
}