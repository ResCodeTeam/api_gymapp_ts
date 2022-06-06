/**
 * @module AuthController
 */
import { Request, Response } from "express";
import { AuthService } from "../../services/auth/autenticacaoService";

export class AuthController {
    async handle(request: Request, response: Response) {
        let { email, password } = request.body;

        try{
            if (email === undefined || password === undefined) {
                throw new Error("Pedido inválido")
            }
    
            const authService = new AuthService();
            const resp = await authService.execute(email, password)
    
            response.status(resp.status).json(resp.data);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}
