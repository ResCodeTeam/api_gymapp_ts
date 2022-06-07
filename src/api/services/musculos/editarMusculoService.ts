/**
 * @module EditarMusculoService
 */

import { checkMusculoExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço de edição de músculos
 */
export class EditarMusculoService {
  /**
   * Método que permite alterar o nome de um músculo
   * @param musculoId id do músculo
   * @param nome nome do musculo
   * @param imagem imagem do musculo
   */
  async execute(musculoId: string, nome: string, imagem: string) {
    const existsMusculo = await checkMusculoExists(musculoId);
    if (!existsMusculo) {
      return { data: "O musculo não existe", status: 500 }
    }

    const musculo = await client.musculos.update({
      where: {
        musculo_id: musculoId
      },
      data: {
        nome,
        img_url: imagem
      }
    })

    return { data: musculo, status: 200 };
  }
}