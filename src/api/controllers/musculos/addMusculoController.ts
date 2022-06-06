/**
 * @module AddMusculoController
 */
import { Request, Response } from "express";
import { AddMusculoService } from "../../services/musculos/addMusculoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar músculos
 */
export class AddMusculoController {
  /**
   * Permite criar um músculo recebendo os dados por body do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link AddMusculoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const { nome, image } = request.body;

    try{
      if (nome === undefined || image === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const addMusculoService = new AddMusculoService();
      const resp = await addMusculoService.execute(nome, image);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
