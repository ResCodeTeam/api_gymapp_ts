
import { checkDonoMarca, checkMarcaExists, checkMobilidadeMarcaUser, getGinasioAluno, getMarcaAluno } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IGinasios {
    userId: string
}

export class VerGinasiosUserService {
    async execute({ userId }: IGinasios) {
        console.log("123")
        const { mobilidade, id } = await checkMobilidadeMarcaUser(userId);
        console.log(mobilidade)
        if(mobilidade){
            const userMarca = await getMarcaAluno(userId);
            const ginasios = await client.ginasio.findMany({
                where: {
                    marca_id: userMarca,
                    isDeleted: false
                }, select: {
                    ginasio_id: true,
                    nome: true,
                }
            })
            return { data: ginasios, status: 200 };
        }
        else{
            console.log(userId)
            const userGym = await getGinasioAluno(userId)
            console.log(userGym)
            const ginasios = await client.ginasio.findFirst({
                where: {
                    ginasio_id: userGym,
                    isDeleted: false
                }, select: {
                    ginasio_id: true,
                    nome: true
                }
            })
            return { data: ginasios, status: 200 };
        }
    }
}