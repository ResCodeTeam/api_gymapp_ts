import { Request, Response } from "express";
import { EditarExercicioService } from "../../services/exercicios/editarExercicioService";

export class EditarExercicioController {
  async handle(request: Request, response: Response) {
    //Declarar Serviço
    const exercicioId = request.params.exercicios_id;
    const autorId = request.params.treinadorId;
    const { nome, descricao, isTempo } = request.body;

    try{
      if (
        exercicioId === undefined ||
        autorId === undefined ||
        nome === undefined ||
        descricao === undefined ||
        isTempo === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const editarExercicioService = new EditarExercicioService();
      const resp = await editarExercicioService.execute({
        exercicioId,
        autorId,
        nome,
        descricao,
        isTempo,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
