import { client } from "../../prisma/client";
import { checkAutorTreino, checkTreinoExists, checkUserIdExists, checkAtividadeExists, checkModalidadeExists, getModalidadeGinasio, getMarcaGym, checkMobilidadeMarcaUser } from "../../helpers/dbHelpers";
import { changeTimeZone } from "../../helpers/dateHelpers";

interface ITreino {
    treinoId: string,
    uId: string,
    atividadeId: string,
    modalidadeId: string,
    duracao: string,
    calorias: number,
    distancia: number,
    data: Date
}

export class EditarTreinosService {
    async execute({ uId, treinoId, atividadeId, modalidadeId, duracao, calorias, distancia, data }: ITreino) {

        if (atividadeId == null && modalidadeId == null) {
            throw new Error("ERRO!!! A atividade e a modalidade não podem ser ambos nulos, pelo menos uma deve ser diferente de null.");
        }

        if (atividadeId != null && modalidadeId != null) {
            throw new Error("ERRO!!! A atividade e a modalidade não podem ser ambas diferentes de null, pelo menos uma deve ser null.");
        }

        const exist_nome = await checkUserIdExists(uId);
        if (!exist_nome) {
            throw new Error("O utilizador não existe");
        }

        const exists_treino = await checkTreinoExists(treinoId);
        if (!exists_treino) {
            throw new Error("O treino não existe");
        }


        const isAutor = await checkAutorTreino(uId, treinoId);
        if (!isAutor) {
            throw new Error("O treino não lhe pertence");
        }

        if (atividadeId != null) {
            const exists_atividades = await checkAtividadeExists(atividadeId);
            if (!exists_atividades) {
                throw new Error("A atividade não existe");
            }
        }

        if (modalidadeId != null) {
            const exists_modalidades = await checkModalidadeExists(modalidadeId);
            if (!exists_modalidades) {
                throw new Error("A modalidade não existe");
            }
        }

        const treino = await client.treinos.findUnique({
            where: {
                treino_id: treinoId
            }
        })
        //verificar se a data é diferente da original
        if (data !== treino.data) {
            const dataAtual = new Date();
            changeTimeZone(dataAtual)
            if (data > dataAtual) {
                throw new Error("A data do treino não pode ser maior que a data atual");
            }
        }

        const ginasio_modalidade = await getModalidadeGinasio(modalidadeId);
        const marca_modalidade = (await getMarcaGym(ginasio_modalidade)).marca_id;

        const { mobilidade, id } = await checkMobilidadeMarcaUser(uId);
        if(mobilidade){
            if(id['marca_id'] != marca_modalidade)
            {
            throw new Error("Não possui permissão")
            }
        }
        else{
            const marca_gym = (await getMarcaGym(id['ginasio_id'])).marca_id;
            if(marca_gym != marca_modalidade)
            {
                throw new Error("Não possui permissão")
            }
        }

        if (treino.atividade_id == null && atividadeId != null) {
            throw new Error("O treino não tem atividade");
        }

        if (treino.modalidade_id == null && modalidadeId != null) {
            throw new Error("O treino não tem modalidade");
        }

        if (modalidadeId != null && atividadeId != null) {
            throw new Error("O treino não pode ter atividade e modalidade");
        }


        const editarTreinos = await client.treinos.update({
            where: {
                treino_id: treinoId
            },
            data: {
                atividade_id: atividadeId,
                modalidade_id: modalidadeId,
                duracao,
                calorias,
                distancia,
                data
            }
        })
        return {data: editarTreinos, status: 200};
    }
}