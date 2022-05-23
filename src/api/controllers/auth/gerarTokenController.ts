import { Request, Response } from "express";
import { generateSessionToken } from "../../helpers/jwtHelpers";
import { RefreshTokenService } from "../../services/auth/refreshTokenService";
require('dotenv').config({ path: __dirname + '/.env' });

export class GerarTokenController {
    async handle(request: Request, response: Response) {
        const refreshToken = request.body.refresh_token;

        if (refreshToken === undefined) {
            response.status(500).json("Pedido inválido");
        }


        const refreshTokenService = new RefreshTokenService();
        const resp = await refreshTokenService.execute(refreshToken);
        response.status(resp.status).json({ "token": resp.data });


    }
}