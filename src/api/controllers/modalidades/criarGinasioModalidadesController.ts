import { Request, Response } from "express";
import { CriarGinasioModalidadesService } from "../../services/modalidades/criarGinasioModalidadesService";

class CriarGinasioModalidadesController {
  async handle(request: Request, response: Response) {
    const ginasioId = request.params.id;
    const adminId = request.params.adminId;

    const { nome, imagemUrl } = request.body;
    if(nome === undefined || imagemUrl === undefined){
      throw new Error("Pedido inválido")
    }

    const criarGinasioModalidadesService = new CriarGinasioModalidadesService();
    const resp = await criarGinasioModalidadesService.execute({
      ginasioId,
      nome,
      imagemUrl,
      adminId
    });
    response.json(resp);
  }
}
export { CriarGinasioModalidadesController };
