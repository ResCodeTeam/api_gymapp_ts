/**
 * @module EditarGinasioService
 */

import { checkDonoGinasio, checkGinasioExists, } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * @param ginasioId ginasio id
 * @param nome nome do ginasio
 * @param rua morada do ginasio
 * @param descricao descrição do ginasio
 * @param imagemUrl url da imagem do ginasio
 * @param lat latitude do ginasio
 * @param long longitude do ginasio
 * @param adminId id do utilizador
 */
export interface IEditarGinasio {
    ginasioId: string,
    nome: string,
    rua: string,
    descricao: string,
    imagemUrl: string,
    lat: string,
    long: string,
    adminId: string
}

export class EditarGinasioService {
    async execute({ ginasioId, adminId, nome, rua, descricao, imagemUrl, lat, long }: IEditarGinasio) {
        const existsGinasio = await checkGinasioExists(ginasioId)
        if (!existsGinasio) {
            return { data: "O ginásio não existe", status: 500 }
        }
        const existsAdmin = await checkDonoGinasio(ginasioId, adminId)
        if (!existsAdmin) {
            return { data: "Não tem permissão para realizar esta operação", status: 500 }
        }

        const EditarGinasio = await client.ginasio.update({
            where: {
                ginasio_id: ginasioId
            },
            data: {
                nome: nome,
                rua: rua,
                descricao: descricao,
                imagem_url: imagemUrl,
                lat: lat,
                long: long

            }
        })
        return { data: EditarGinasio, status: 200 };
    }

}