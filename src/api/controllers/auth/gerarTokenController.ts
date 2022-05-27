import { Request, Response } from "express";
import { generateSessionToken } from "../../helpers/jwtHelpers";
import { RefreshTokenService } from "../../services/auth/refreshTokenService";
require("dotenv").config({ path: __dirname + "/.env" });

export class GerarTokenController {
  async handle(request: Request, response: Response) {
    const refreshToken = request.body.refresh_token;

    try{
      if (refreshToken === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const refreshTokenService = new RefreshTokenService();
      const resp = await refreshTokenService.execute(refreshToken);
      response.status(resp.status).json({ token: resp.data });
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
