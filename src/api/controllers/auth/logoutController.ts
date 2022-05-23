import { Request, Response } from "express";
import { LogoutService } from "../../services/auth/logoutService";

export class LogoutController {
  async handle(request: Request, response: Response) {
    const userId = request.params.userId;
    const token = request.headers.authorization.split(" ")[1];
    if (userId === undefined || token === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const logoutService = new LogoutService();
    const resp = await logoutService.execute(userId, token);
    response.status(resp.status).json(resp.data);
  }
}
