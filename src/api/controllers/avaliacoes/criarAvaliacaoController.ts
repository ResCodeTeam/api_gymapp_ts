import { Request, Response } from "express";
import { CriarAvaliacaoService } from "../../services/avaliacoes/criarAvaliacaoService";


export class CriarAvaliacaoController{
  async handle(request:Request, response:Response){
    const {
        alunoId,
        peso,
        unidadePeso,
        treinadorId,
        musculo,
        gorduraCorporal,
        gorduraVisceral,
        agua,
        proteina,
        massaOssea,
        metabolismoBasal,
        imagens,
        medidas
    }= request.body;
    if(alunoId === undefined || peso === undefined || unidadePeso === undefined || treinadorId === undefined || musculo === undefined || gorduraCorporal === undefined || gorduraVisceral === undefined || agua === undefined || proteina === undefined || massaOssea === undefined || metabolismoBasal === undefined || imagens === undefined || medidas === undefined){
      throw new Error("Pedido inválido")
    }

    const data = new Date(Date.now());
    const criarAvaliacaoService = new CriarAvaliacaoService();
    const resp = await criarAvaliacaoService.execute({ 
        alunoId,
        data,
        peso,
        unidadePeso,
        treinadorId,
        musculo,
        gorduraCorporal,
        gorduraVisceral,
        agua,
        proteina,
        massaOssea,
        metabolismoBasal,
        imagens,
        medidas});

    response.json(resp)
  }
}