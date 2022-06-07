/**
 * @module VerTodosGinasiosService
 */
import { checkDonoMarca, checkMarcaExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * @param marcaId marca id
 * @param userId id do utilizador
 */
export interface IGinasios {
    marcaId: string,
    userId: string
}

/**
 * Classe responsavel pelo serviço que serve para obter todos os ginásios
 */
export class VerTodosGinasiosService {
    /**
     * Método que permite ver todos as ginasio tendo em conta a marca e o utilizar que realiza o pedido
     * @param IGinasios dados da marca e do utilizador 
     * @returns 
     */
    async execute({ marcaId, userId }: IGinasios) {
        const exists_ginasios = await checkMarcaExists(marcaId)
        if (!exists_ginasios) {
            return { data: "A marca não existe", status: 500 }
        }

        await checkDonoMarca(marcaId, userId);

        const ginasios = await client.ginasio.findMany({
            where: {
                marca_id: marcaId

            }, select: {
                nome: true,
                imagem_url: true,
            }
        })
        return { data: ginasios, status: 200 };
    }
}