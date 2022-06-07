/**
 * @module VerUmaMarcaService
 */
import { checkMarcaExists, checkAutorMarca, getDonoMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * @param donoId dono id
 * @param marcaId marca id
 */
export interface IMarca {
    donoId: string,
    marcaId: string
}

/**
 * Classe responsavel pelo serviço que serve para obter os dados de uma marca
 */
export class VerUmaMarcaService {
    /**
     * Método que permite ver os dados de uma marca
     * @param IMarca dados da marca 
     * @returns 
     */
    async execute({ donoId, marcaId }: IMarca) {

        const exists_marca = await checkMarcaExists(marcaId)
        if (!exists_marca) {
            return { data: "A marca não existe", status: 500 }
        }

        const dono_marca = await getDonoMarca(marcaId);

        if (donoId != dono_marca) {
            return { data: "Não possui autorização", status: 500 }
        }

        const marca = await client.marcas.findFirst({
            where: {
                marca_id: marcaId,
                dono_id: donoId,
                isDeleted: false
            }
        })
        return { data: marca, status: 200 };
    }
}