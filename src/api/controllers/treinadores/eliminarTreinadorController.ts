import { Request, Response } from "express";
import { EliminarTreinadorService } from "../../services/treinadores/eliminarTreinadorService";

class EliminarTreinadorController {
  async handle(request: Request, response: Response) {
    const treinador_id = request.params.id;
    const userId = request.params.adminId;
    if (treinador_id === undefined || userId === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const eliminarTreinadorService = new EliminarTreinadorService();
    const resp = await eliminarTreinadorService.execute({
      treinador_id,
      userId,
    });
    response.status(resp.status).json(resp.data);
  }
}

export { EliminarTreinadorController };
