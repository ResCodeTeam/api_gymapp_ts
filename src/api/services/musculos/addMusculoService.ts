/**
 * @module AddMusculoService
 */

import { checkMusculoNomeExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço de criação de músculos
 */
export class AddMusculoService {
  /**
   * Método que permite criar um músculo
   * @param nome nome do músculo
   * @param image imagem do músculo
   */
  async execute(nome: string, image: string) {
    const existsMusculeName = await checkMusculoNomeExists(nome);
    if (existsMusculeName) {
      return { data: "Musculo já existente", status: 500 }
    }

    const musculo = await client.musculos.create({
      data: {
        nome,
        img_url: image
      }
    })

    return { data: musculo, status: 200 };
  }
}