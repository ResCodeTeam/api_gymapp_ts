/**
 * @module RemoverMarcaService
 */

import { client } from "../../prisma/client";
import { checkMarcaExists, checkAutorMarca } from "../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço de remoção de marcas
 */
class RemoverMarcaService {
  /**
   * Método que permite remover uma marca tendo em conta todas as verificações necessárias
   * @param uId id do dono da marca
   * @param marcaId id da marca
  
   */
  async execute(uId: string, marcaId: string) {
    const exists_dst = await checkMarcaExists(marcaId);
    if (!exists_dst) {
      return { data: "A marca não existe", status: 500 }
    }

    const autor_marca = await client.marcas.findUnique({
      where: {
        marca_id: marcaId
      }
    })
    const isAutor = await checkAutorMarca(uId, marcaId);
    if (!isAutor) {
      return { data: "A marca não lhe pertence", status: 500 }
    }

    const marca = await client.marcas.update({
      data: {
        isDeleted: true,
      },
      where: {
        marca_id: marcaId,
      },
    });

    return {
      data: "Marca removida com sucesso",
      status: 200
    };
  }
}

export { RemoverMarcaService };
