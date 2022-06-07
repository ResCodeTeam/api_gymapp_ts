/**
 * @module VerUmGinasioService
 */
import { checkDonoGinasio, checkGinasioExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter os dados de um ginásio
 */
export class VerUmGinasioService {
    async execute(donoId: string, ginasioId: string) {
        const exists_ginasio = await checkGinasioExists(ginasioId)
        if (!exists_ginasio) {
            return { data: "O ginásio não existe", status: 500 }
        }

        await checkDonoGinasio(ginasioId, donoId);

        const ginasio = await client.ginasio.findFirst({
            where: {
                ginasio_id: ginasioId,
                isDeleted: false,
                marcas: {
                    dono_id: donoId
                }
            }
        })
        return { data: ginasio, status: 200 };
    }
}