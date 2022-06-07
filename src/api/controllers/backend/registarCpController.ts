/**
 * @module RegistarCpController
 */
import { Request, Response } from "express";
import { RegistarCpService } from "../../services/backend/registarCpService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar códigos postais
 */
export class RegistarCpController {
    /**
   * Permite criar códigos postais recebendo os dados por body do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RegistarCpService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
    async handle(request: Request, response: Response) {
        const { cp, cpExt, rua, localidade } = request.body

        try{
            if (cp === undefined || cpExt === undefined || rua === undefined || localidade === undefined) {
                throw new Error("Pedido inválido")
            }
    
            const registarCpService = new RegistarCpService()
            const resp = await registarCpService.execute({ cp, cpExt, rua, localidade })
            response.status(resp.status).json(resp.data);
        } catch (e) {
            response.status(500).json(e.message)
        } 
    }
}