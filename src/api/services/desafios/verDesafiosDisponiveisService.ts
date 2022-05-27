
import { checkAlunoGinasio, checkGinasioExists, checkMobilidadeMarcaUser, getAlunoMarca, getDonoMarca, getFuncaoId, getGinasioAluno, getMarcaGym, getMobilidadeMarca, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IGinasios {
    uId: string,
    ginasioId: string
}

export class VerDesafiosDisponiveisService {
    async execute({ uId, ginasioId }: IGinasios) {
        const exists_dst = await checkGinasioExists(ginasioId);
        if (!exists_dst) {
            return { data: "O ginasio não existe", status: 500 }
        }

        const funcao = await getUserFuncao(uId);
        const treinador = await getFuncaoId("Treinador");
        const admin = await getFuncaoId("Administrador");

        const marca_ginasio = (await getMarcaGym(ginasioId)).marca_id;
        const dono_marca = await getDonoMarca(marca_ginasio);

        // treinador
        if (funcao == treinador) {
            const marca_treinador = await getTreinadorMarca(uId)
            if (marca_treinador != marca_ginasio) {
                return { data: "Não tem autorização", status: 500 }
            }
        }
        // admin
        else if (funcao == admin) {
            if (uId != dono_marca) {
                return { data: "Não tem autorização", status: 500 }
            }
        }
        // aluno
        else {
            const { mobilidade, id } = await checkMobilidadeMarcaUser(uId);
            if (mobilidade) {
                if (id['marca_id'] != marca_ginasio) {
                    return { data: "Não possui permissão", status: 500 }
                }
            }
            else {
                if (id['ginasio_id'] != ginasioId) {
                    return { data: "Não possui permissão", status: 500 }
                }
            }
        }



        const desafios = await client.desafios.findMany({
            where: {
                ginasio_id: ginasioId,
                isDeleted: false,
                isEncerrado: false
            }, select: {
                nome: true,
                data_inicio: true,
                data_fim: true,
                recompensa: true,
                descricao: true
            }
        })
        return { data: desafios, status: 200 };
    }
}