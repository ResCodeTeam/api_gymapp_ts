/**
 * @module RegistarFuncoesController
 */
import { Request, Response } from "express";
import { RegistarFuncoesService } from "../../services/backend/registarFuncoesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar funções do utilizador
 */
export class RegistarFuncoesController {
    /**
   * Permite criar funções do utilizador recebendo os dados por body do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RegistarFuncoesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
    async handle(request: Request, response: Response) {
        let { nome } = request.body;

        try{
            if (nome === undefined) {
                throw new Error("Pedido inválido")
            }
    
            const registarFuncoesService = new RegistarFuncoesService();
            const resp = await registarFuncoesService.execute(nome);
    
            response.status(resp.status).json(resp.data);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}