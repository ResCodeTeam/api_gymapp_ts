import { Request, Response } from "express";
import { AuthService } from "../../services/auth/autenticacaoService";

export class AuthController{
    async handle(request:Request, response:Response){
        let {email,password} = request.body;
  
        const authService = new AuthService();
        const resp = await authService.execute(email,password)
        
        response.json(resp);
    }
}
