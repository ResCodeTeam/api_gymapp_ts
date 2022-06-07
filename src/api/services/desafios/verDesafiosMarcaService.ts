/**
 * @module VerDesafiosMarcaService
 */
import { getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço de obter os desafios de uma marca
 */
export class VerDesafiosMarcaService {
  /**
 * Método que permite obter os desafios de uma marca da base de dados tendo em conta todas as verificações necessárias
 * 
 * @param uid id do utilizador
 */
  async execute(uid: string) {
    const marcaId = await getTreinadorMarca(uid);

    const latenight = new Date();

    latenight.setHours(23, 59, 59);
    const desafios = await client.desafios.findMany({
      where: {
        ginasio: {
          marca_id: marcaId
        },

        data_inicio: {
          lte: new Date()
        },
        data_fim: {
          gt: new Date()
        }

      },
      include: {
        modalidades_ginasio: {
          select: {
            nome: true
          }
        }
      }

    })
    return { data: desafios, status: 200 };
  }
}