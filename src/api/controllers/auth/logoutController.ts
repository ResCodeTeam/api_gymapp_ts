import { Request, Response } from "express";
import { LogoutService } from "../../services/auth/logoutService";

export class LogoutController {
    async handle(request: Request, response: Response) {
        const userId = request.params.userId;
        const token = request.headers.authorization.split(' ')[1];

        const logoutService = new LogoutService();
        const resp = await logoutService.execute(userId, token);
        response.json(resp.data).status(resp.status);
    }
}