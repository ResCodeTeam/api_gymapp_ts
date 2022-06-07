/**
 * @module EditarMusculoService
 */

import { checkMusculoExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço de edição de músculos
 */
export class EditarMusculoService {
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