
import { checkDonoGinasio, checkGinasioExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class VerUmGinasioService {
    async execute(donoId: string, ginasioId: string) {
        console.log(ginasioId)
        const exists_ginasio = await checkGinasioExists(ginasioId)
        if (!exists_ginasio) {
            return { date: "O ginásio não existe", status: 500 }
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
        return ginasio;
    }
}