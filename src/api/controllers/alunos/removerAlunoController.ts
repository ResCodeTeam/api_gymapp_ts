import { RemoverAlunoService } from "../../services/alunos/removerAlunoService";
import { Request, Response } from "express";

export class RemoverAlunoController {
  async handle(request: Request, response: Response) {
    const uId = request.params.uId;
    const adminId = request.params.adminId;

    try{
      if (uId === undefined || adminId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerAlunoService = new RemoverAlunoService();
      const resp = await removerAlunoService.execute(uId, adminId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
