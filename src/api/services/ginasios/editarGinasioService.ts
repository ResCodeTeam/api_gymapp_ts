import { checkDonoGinasio, checkGinasioExists, } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IEditarGinasio {
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
            return { date: "O ginásio não existe", status: 500 }
        }
        const existsAdmin = await checkDonoGinasio(ginasioId, adminId)
        if (!existsAdmin) {
            return { date: "Não tem permissão para realizar esta operação", status: 500 }
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
        return {data: EditarGinasio, status: 200};
    }

}