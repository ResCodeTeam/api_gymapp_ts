/**
 * @module RegistarFuncoesService
 */
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço de criação de funções dos utilizadores
 */
export class RegistarFuncoesService {
    async execute(nome: string) {
        const funcao = await client.funcoes.create({
            data: {
                descricao: nome
            }
        })
        return {data: funcao, status: 200};
    }
}