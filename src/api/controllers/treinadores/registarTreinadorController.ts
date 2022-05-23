import { Request, Response } from "express";
import { RegistarTreinadorService } from "../../services/treinadores/registarTreinadorService";

export class RegistarTreinadorController {
  async handle(request: Request, response: Response) {
    const marcaId = request.params.id;
    const userId = request.params.adminId;
    let { email, nome, password, dataNasc, dataEntrada, genero } = request.body;

    try{
      if (
        marcaId === undefined ||
        userId === undefined ||
        email === undefined ||
        nome === undefined ||
        password === undefined ||
        dataNasc === undefined ||
        dataEntrada === undefined ||
        genero === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      dataNasc = new Date(dataNasc);
      dataEntrada = new Date(dataEntrada);
  
      const registarTreinadorService = new RegistarTreinadorService();
      const resp = await registarTreinadorService.execute({
        marcaId,
        email,
        nome,
        password,
        dataNasc,
        dataEntrada,
        genero,
        userId,
      });
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
