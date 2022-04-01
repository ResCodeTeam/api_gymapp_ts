import { client } from "../../../prisma/client";
import { checkUserIdExists, checkModalidadeExists } from "../../../helpers/dbHelpers";

interface IPlano{
    plano_treino_id : string;
    aluno_id : string;
    treinador_id : string;
    data : string;
    modalidade_id : string;
    bloco: string
}

export class CriarPlanoTreinoService{
    async execute({plano_treino_id, aluno_id, treinador_id, data, modalidade_id, bloco}: IPlano) {

        const exists_aluno = await checkUserIdExists(aluno_id);
        if (!exists_aluno) {
            throw new Error("O aluno não existe");
        }

        const exists_treinador = await checkUserIdExists(treinador_id);
        if (!exists_treinador) {
            throw new Error("Ginásio não existe");
        }

        const exists_modalidade = await checkModalidadeExists(modalidade_id);
        if (!exists_modalidade) {
            throw new Error("A modalidade não existe");
        }

        const plano = await client.planos_treino.create({
            data:{
                plano_treino_id: plano_treino_id,
                aluno_id: aluno_id,
                treinador_id: treinador_id,
                data: data,
                modalidade_id: modalidade_id
            },
        });

        console.log(plano);

        // Incompleto

    }

}