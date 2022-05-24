
import { checkDonoGinasio, checkGinasioExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IGinasios {
    ginasioId: string;
    userId: string;
}

export class VerTodasModalidadesService {
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