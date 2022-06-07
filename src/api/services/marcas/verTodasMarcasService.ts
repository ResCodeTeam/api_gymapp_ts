/**
 * @module VerTodasMarcasService
 */
import { client } from "../../prisma/client";

/**
 * @param donoId
 */
export interface IGinasios {
    donoId: string
}

/**
 * Classe responsavel pelo serviço que serve para obter todas as marcas
 */
export class VerTodasMarcasService {
    async execute({ donoId }: IGinasios) {

        const marcas = await client.marcas.findMany({
            where: {
                dono_id: donoId,
                isDeleted: false

            }, select: {
                marca_id: true,
                nome: true,
                cor: true,
                logotipo: true,
                mobilidade: true
            }
        })
        return { data: marcas, status: 200 };
    }
}