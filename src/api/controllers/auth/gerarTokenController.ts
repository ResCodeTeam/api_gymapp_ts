import { Request, Response } from "express";
import { generateSessionToken } from "../../helpers/jwtHelpers";
require('dotenv').config({ path: __dirname + '/.env' });

export class GerarTokenController {
    async handle(request: Request, response: Response) {
        const userId = request.params.userId;
        if (userId === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const token = await generateSessionToken(userId)

        response.json({ token })


    }
}