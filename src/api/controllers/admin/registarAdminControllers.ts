/**
 * @module RegistarAdminController
 */
import { Request, Response } from "express";
import { RegistarAdminService } from "../../services/admin/registarAdminService";

/**
 * Classe responsável por receber e chamar os métodos do serviço de registo de admins
 */
export class RegistarAdminController {
  /**
   * Permite registar um admin recebendo os dados pelo body do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RegistarAdminService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    let { email, nome, password, dataNasc, dataEntrada, genero } = request.body;
    try {
      if (
        email === undefined ||
        nome === undefined ||
        password === undefined ||
        dataNasc === undefined ||
        dataEntrada === undefined ||
        genero === undefined
      ) {
        throw new Error("Pedido inválido");
      }

      const registarAdminService = new RegistarAdminService();
      dataNasc = new Date(dataNasc);
      dataEntrada = new Date(dataEntrada);

      const resp = await registarAdminService.execute({
        email,
        nome,
        password,
        dataNasc,
        dataEntrada,
        genero,
      });

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
