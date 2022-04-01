import { Request, Response } from "express";
import { CriarAvaliacaoService } from "../../../services/treinador/avaliacoes/criarAvaliacaoService";


export class CriarAvaliacaoController{
  async handle(request:Request, response:Response){
    const {
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
        medidas
    }= request.body;

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