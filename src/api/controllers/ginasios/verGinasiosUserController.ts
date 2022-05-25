import { Request, Response } from "express";
import { VerGinasiosUserService } from "../../services/ginasios/verGinasiosUserService";
import { VerTodosGinasiosService } from "../../services/ginasios/verTodosGinasiosService";

export class VerGinasiosUserController {
  async handle(request: Request, response: Response) {
    const userId = request.params.alunoId;
  
    const verGinasiosUserService = new VerGinasiosUserService();
    const resp = await verGinasiosUserService.execute({ userId });
    response.status(resp.status).json(resp.data);
  }
}
