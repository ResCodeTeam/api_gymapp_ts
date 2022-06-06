/**
 * @module RegistarAlunoController
 */
import { Request, Response } from "express";
import { RegistarAlunoService } from "../../services/alunos/registarAlunoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para registar alunos
 */
export class RegistarAlunoController {
  /**
   * Permite registar alunos recebendo os dados pelo body do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RegistarAlunoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    let donoId = request.params.adminId;
    let { email, nome, password, dataNasc, dataEntrada, genero, ginasioId } =
      request.body;

    try{
      if (
        email === undefined ||
        nome === undefined ||
        password === undefined ||
        dataNasc === undefined ||
        dataEntrada === undefined ||
        genero === undefined ||
        ginasioId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      dataNasc = new Date(dataNasc);
      dataEntrada = new Date(dataEntrada);
      const registarAlunoService = new RegistarAlunoService();
      const resp = await registarAlunoService.execute({
        email,
        nome,
        password,
        dataNasc,
        dataEntrada,
        genero,
        ginasioId,
        donoId,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    } 
  }
}
