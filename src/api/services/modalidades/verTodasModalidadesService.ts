/**
 * @module VerTodasModalidadesService
 */
import { checkDonoGinasio, checkGinasioExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * @param ginasioId ginasio id
 * @param userId user id
 */
export interface IGinasios {
    ginasioId: string;
    userId: string;
}

/**
 * Classe responsavel pelo serviço que serve para obter todas as modalidades
 */
export class VerTodasModalidadesService {
    /**
     * Método que permite obter todas as modalidades de um ginásio tendo em conta todas as verificações necessárias
     * @param IGinasios dados id do ginasio e id do user 
     * @returns 
     */
    async execute({ ginasioId, userId }: IGinasios) {

        const exists_ginasio = await checkGinasioExists(ginasioId)
        if (!exists_ginasio) {
            return { data: "O ginásio não existe", status: 500 }
        }

        await checkDonoGinasio(ginasioId, userId);

        const marcas = await client.modalidades_ginasio.findMany({
            where: {
                ginasio_id: ginasioId,
                isDeleted: false

            }, select: {
                nome: true,
                imagem_url: true,
            }
        })
        return { data: marcas, status: 200 };
    }
}