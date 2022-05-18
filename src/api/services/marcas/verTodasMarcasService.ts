
import { client } from "../../prisma/client";

interface IGinasios {
    donoId: string
}

export class VerTodasMarcasService {
    async execute({ donoId }: IGinasios) {

        const marcas = await client.marcas.findMany({
            where: {
                dono_id: donoId,
                isDeleted: false

            }, select: {
                nome: true,
                logotipo: true,
            }
        })
        return marcas;
    }
}