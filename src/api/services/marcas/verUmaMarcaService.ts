
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
            return { date: "A marca não existe", status: 500 }
        }

        const dono_marca = await getDonoMarca(marcaId);

        console.log(donoId)
        console.log(dono_marca)
        if (donoId != dono_marca) {
            return { date: "Não possui autorização", status: 500 }
        }

        const marca = await client.marcas.findFirst({
            where: {
                marca_id: marcaId,
                dono_id: donoId,
                isDeleted: false
            }
        })
        return marca;
    }
}