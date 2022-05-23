import { Request, Response } from "express";
import { EditarPerfilService } from "../../services/perfil/editarPerfilService";

export class EditarPerfilController {
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;

    let { email, nome, password, genero, descricao, imagemUrl } = request.body;

    if (
      uId === undefined ||
      email === undefined ||
      nome === undefined ||
      password === undefined ||
      genero === undefined ||
      descricao === undefined ||
      imagemUrl === undefined
    ) {
      response.status(500).json("Pedido inválido");
    }

    const editarPerfilController = new EditarPerfilService();
    const resp = await editarPerfilController.execute({
      uId,
      email,
      nome,
      password,
      genero,
      descricao,
      imagemUrl,
    });
    response.status(resp.status).json(resp.data);
  }
}
