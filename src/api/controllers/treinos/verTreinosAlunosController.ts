import { Request, Response } from "express";
import { VerTreinosAlunosService } from "../../services/treinos/verTreinosAlunosService";

export class VerTreinosAlunosController {
  async handle(request: Request, response: Response) {
    const uId = request.params.alunoId;

    try{
      if (uId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verTreinosAlunosService = new VerTreinosAlunosService();
      const resp = await verTreinosAlunosService.execute(uId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
