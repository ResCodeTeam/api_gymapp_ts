import { Request, Response } from "express";
import { VerTodosMusculosService } from "../../services/musculos/verTodosMusculosService";

export class VerTodosMusculosController {
    async handle(request: Request, response: Response) {

        const verTodosMusculosService = new VerTodosMusculosService();
        const resp = await verTodosMusculosService.execute();
        response.json(resp.data).status(resp.status);
    }
}