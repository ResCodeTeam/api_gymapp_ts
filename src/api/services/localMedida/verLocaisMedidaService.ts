/**
 * @module VerLocaisMedidaService
 */

import { getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * @param uId id do utilizador
 */
export interface ILocaisMedida {
    uId: string
}

export class VerLocaisMedidaService {
    async execute({ uId }: ILocaisMedida) {
        const treinadorMarca = await getTreinadorMarca(uId);

        const localMedida = await client.locais_medidas.findMany({
            where: {
                local_medidas_marca: {
                    every: {
                        marca_id: treinadorMarca
                    }
                }
            },
            select: {
                local_medida_id: true,
                descricao: true,
                unilado: true
            }
        })
        return { data: localMedida, status: 200 };
    }
}