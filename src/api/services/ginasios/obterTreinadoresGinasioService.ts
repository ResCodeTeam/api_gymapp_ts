import { checkMarcaExists, getDonoMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";



export class VerTreinadorGinasioService {
    async execute(uId: string, marcaId: string) {

        const existsMarca = await checkMarcaExists(marcaId)
        if (!existsMarca) {
            return { date: "A marca não existe", status: 500 }
        }

        const dono_marca = await getDonoMarca(marcaId);
        if (uId != dono_marca) {
            return { date: "Não possui autorização", status: 500 }
        }

        const treinadorMarca = await client.treinadores_marca.findMany({
            where: {
                marca_id: marcaId
            }, select: {
                treinador_uid: true
            }
        })
        return {data: treinadorMarca, status: 200};
    }
}