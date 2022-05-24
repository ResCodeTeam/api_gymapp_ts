import { Request, Response } from "express";
import { RemoverModalidadesService } from "../../services/modalidades/removerModalidadesService";

class RemoverModalidadesController {
  async handle(request: Request, response: Response) {
    const uid = request.params.adminId;
    const modalidadeId = request.params.id;
    const ginasioId = request.params.ginasioId;

    try{
      if (
        uid === undefined ||
        modalidadeId === undefined ||
        ginasioId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const removerModalidadesService = new RemoverModalidadesService();
      const resp = await removerModalidadesService.execute(
        modalidadeId,
        ginasioId,
        uid
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}

export { RemoverModalidadesController };
