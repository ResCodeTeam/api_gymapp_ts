/**
 * @module VerAvaliacoesService
 */
import { checkUserIdExists, getFuncaoId, getMarcaAluno, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter avaliações
 */
export class VerAvaliacoesService {
    async execute(userId: string, alunoId: string) {

        const exists_aluno = await checkUserIdExists(alunoId)
        if (!exists_aluno) {
            return { data: "O utilizador não existe", status: 500 }
        }

        const existsID = await checkUserIdExists(userId)
        if (!existsID) {
            return { data: "O utilizador não existe", status: 500 }
        }

        const funcao = await getUserFuncao(userId);
        const funcTreinadorId = await getFuncaoId('Treinador')
        const funcAlunoId = await getFuncaoId('Aluno')
        if (funcao == funcTreinadorId) {
            const marcaAluno = await getMarcaAluno(alunoId);
            const marcaTreinador = await getTreinadorMarca(userId);

            if (marcaAluno != marcaTreinador) {
                return { data: "Não possui permissões", status: 500 }
            }
        } else if (funcao == funcAlunoId) {
            if (alunoId != userId) {
                return { data: "Não possui permissões", status: 500 }
            }
        }

        const avaliacao = await client.avaliacoes.findMany({
            where: {
                aluno_id: alunoId,
                isDeleted: false

            },
            select: {
                avaliacao_id: true,
                data: true,
                peso: true,
                musculo: true,
                gordura_corporal: true,
                gordura_visceral: true,
                agua: true,
                proteina: true,
                massa_ossea: true,
                metabolismo_basal: true,
                avaliacao_imagens: {
                    select: {
                        url: true
                    }
                },
                medidas_avaliacao: {
                    select: {
                        medida: true,
                        unidade_medida: true,
                        locais_medidas: {
                            select: {
                                descricao: true,
                                unilado: true
                            }
                        },
                    }
                },
                users_avaliacoes_treinador_idTousers: {
                    select: {
                        nome: true,
                        imagem_url: true
                    }
                }
            }
        })
        return { data: avaliacao, status: 200 };
    }
}