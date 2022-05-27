
import { checkMarcaExists, checkAutorMarca, getDonoMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IMarca {
    donoId: string,
    marcaId: string
}


export class VerUmaMarcaService {
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