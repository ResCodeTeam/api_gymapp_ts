/**
 * @module CriarAvaliacaoController
 */
import { Request, Response } from "express";
import { CriarAvaliacaoService } from "../../services/avaliacoes/criarAvaliacaoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar avaliações
 */
export class CriarAvaliacaoController {
  /**
   * Permite criar avaliações recebendo os dados pelo body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarAvaliacaoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const alunoId = request.params.id;
    const {
      peso,
      unidadePeso,
      musculo,
      gorduraCorporal,
      gorduraVisceral,
      agua,
      proteina,
      massaOssea,
      metabolismoBasal,
      imc,
      imagens,
      medidas,

    } = request.body;

    try {
      if (
        treinadorId === undefined ||
        alunoId === undefined ||
        peso === undefined ||
        unidadePeso === undefined ||
        treinadorId === undefined ||
        musculo === undefined ||
        gorduraCorporal === undefined ||
        gorduraVisceral === undefined ||
        agua === undefined ||
        proteina === undefined ||
        massaOssea === undefined ||
        metabolismoBasal === undefined ||
        imc === undefined ||
        imagens === undefined ||
        medidas === undefined
      ) {
        throw new Error("Pedido inválido");
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
        imc,
        imagens,
        medidas,
      });

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
