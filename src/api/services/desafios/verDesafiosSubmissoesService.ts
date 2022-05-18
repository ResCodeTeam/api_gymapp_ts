
import { checkDesafioIdExists, checkMobilidadeMarcaUser, getDesafioGinasio, getDonoMarca, getFuncaoId, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class VerDesafiosSubmissoesService {
    async execute(uId: string, desafioId: string) {

        const exists_desafio = await checkDesafioIdExists(desafioId)
        console.log(exists_desafio)
        if (!exists_desafio) {
            console.log('atum')
            return { data: "Desafio não existe", status: 500 }
            return { data: "O desafio não existe", status: 500 }
        }
        console.log('aqui')

        const funcao = await getUserFuncao(uId);
        console.log('aqui1')
        const treinador = await getFuncaoId("Treinador");
        const admin = await getFuncaoId("Administrador");

        const ginasio_desafio = await getDesafioGinasio(desafioId);
        const marca_ginasio = (await getMarcaGym(ginasio_desafio)).marca_id;
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
                if (id['ginasio_id'] != ginasio_desafio) {
                    return { data: "Não possui permissão", status: 500 }
                }
            }
        }

        const desafios = await client.submissoes_desafios.findMany({
            where: {
                desafio_id: desafioId,
                desafios: {
                    isDeleted: false,
                    isEncerrado: false
                }
            },
        })

        return { data: desafios, status: 200 };
    }
}