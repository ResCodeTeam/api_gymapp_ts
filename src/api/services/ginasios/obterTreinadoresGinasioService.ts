/**
 * @module VerTreinadorGinasioService
 */

import { checkMarcaExists, getDonoMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter os treinadores dos ginásios
 */
export class VerTreinadorGinasioService {
    /**
 * Método que permite obter os treinadores de um ginásio da base de dados tendo em conta todas as verificações necessárias
 * 
 * @param uId interface de dados do serviço
 * @param marcaId id da marca
 */
    async execute(uId: string, marcaId: string) {

        const existsMarca = await checkMarcaExists(marcaId)
        if (!existsMarca) {
            return { data: "A marca não existe", status: 500 }
        }

        const dono_marca = await getDonoMarca(marcaId);
        if (uId != dono_marca) {
            return { data: "Não possui autorização", status: 500 }
        }

        const treinadorMarca = await client.treinadores_marca.findMany({
            where: {
                marca_id: marcaId
            }, select: {
                treinador_uid: true
            }
        })
        return { data: treinadorMarca, status: 200 };
    }
}