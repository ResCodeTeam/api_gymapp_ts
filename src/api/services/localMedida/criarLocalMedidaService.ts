/**
 * @module CriarLocalMedidaService
 */

import { checkAutorMarca, checkMarcaExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço de criação de locais de medida
 */
export class CriarLocalMedidaService {
  async execute(uid: string, marcaId: string, descricao: string, unilado: boolean) {

    const existMarca = await checkMarcaExists(marcaId);
    if (!existMarca) {
      return { data: "Marca inexistente", status: 500 }
    }


    const isAutorMarca = await checkAutorMarca(uid, marcaId);
    if (!isAutorMarca) {
      return { data: "Não possui autorização para realizar esta operação", status: 500 }
    }

    const localMedida = await client.locais_medidas.create({
      data: {
        descricao,
        unilado,
      }
    })
    try {
      await client.local_medidas_marca.create({
        data: {
          marca_id: marcaId,
          local_medida_id: localMedida.local_medida_id
        }
      })
    } catch (e) {
      client.locais_medidas.delete({
        where: {
          local_medida_id: localMedida.local_medida_id
        }
      })
    }

    return { data: localMedida, status: 200 };

  }
}