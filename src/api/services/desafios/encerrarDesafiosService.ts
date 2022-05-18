import { checkDesafioDisponivel, checkDesafioIdExists, getDonoMarca, getFuncaoId, getGinasioDesafio, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IDesafio {
    uId: string,
    isEncerrado: boolean,
    desafioId: string,
}

export class EncerrarDesafiosService {
    async execute({ uId, isEncerrado, desafioId }: IDesafio) {

        const search_desafio = await checkDesafioIdExists(desafioId);
        if (!search_desafio) {
            return { date: "Não existe o desafio", status: 500 }
        }

        const funcao = await getUserFuncao(uId);
        const treinador = await getFuncaoId("Treinador");

        const ginasio_desafio = await getGinasioDesafio(desafioId);
        const marca_ginasio = (await getMarcaGym(ginasio_desafio)).marca_id;
        const dono_marca = await getDonoMarca(marca_ginasio);

        const desafio_disponivel = await checkDesafioDisponivel(desafioId);
        if (!desafio_disponivel) {
            return { date: "O desafio já não está disponível", status: 500 }
        }

        // treinador
        if (funcao == treinador) {
            const marca_treinador = await getTreinadorMarca(uId)
            if (marca_treinador != marca_ginasio) {
                return { date: "Não tem autorização", status: 500 }
            }
        }
        // admin
        else {
            if (uId != dono_marca) {
                return { date: "Não tem autorização", status: 500 }
            }
        }

        await client.desafios.update({
            where: {
                desafio_id: desafioId
            },
            data: {
                isEncerrado
            }
        });
        return {
            message: "Desafio encerrado com sucesso."
        };
    }
}