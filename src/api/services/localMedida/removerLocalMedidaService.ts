/**
 * @module RemoverLocalMedidaService
 */
import { checkAutorMarca, checkMarcaExists, getLocalMedidaMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço de remoção de locais de medida
 */
export class RemoverLocalMedidaService {
  /**
   * Método que permite remover um local de medida de uma marca tendo em conta todas as verificações necessárias
   * @param uid id do utilizador
   * @param marcaId id da marca
   * @param localId id do local de medida
   * @returns 
   */
  async execute(uid: string, marcaId: string, localId: string) {

    const isMarca = await checkMarcaExists(marcaId);
    if (!isMarca) {
      return { data: "A marca não existe", status: 500 }
    }

    const isAutorMarca = await checkAutorMarca(uid, marcaId);
    if (!isAutorMarca) {
      return { data: "Não possui autorização para realizar esta operação", status: 500 }
    }

    let marca = await getLocalMedidaMarca(localId);
    if (marca == marcaId) {
      await client.local_medidas_marca.delete({
        where: {
          local_medida_id_marca_id: {
            marca_id: marcaId,
            local_medida_id: localId
          }
        },
      })

      const localMedida = await client.locais_medidas.delete({
        where: {
          local_medida_id: localId
        }
      })
    }
    else {
      return { data: "O local de medida não pertence à marca", status: 500 }
    }

    return { data: "Local removido com sucesso", status: 200 }

  }
}