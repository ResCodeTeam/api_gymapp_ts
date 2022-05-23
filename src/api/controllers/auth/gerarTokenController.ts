import { Request, Response } from "express";
import { generateSessionToken } from "../../helpers/jwtHelpers";
import { RefreshTokenService } from "../../services/auth/refreshTokenService";
require('dotenv').config({ path: __dirname + '/.env' });

export class GerarTokenController {
    async handle(request: Request, response: Response) {
        const refreshToken = request.body.refresh_token;

        if (refreshToken === undefined) {
            response.json("Pedido inválido").status(500);
        }


        const refreshTokenService = new RefreshTokenService();
        const resp = await refreshTokenService.execute(refreshToken);

        response.json({ "token": resp.data }).status(resp.status);


    }
}