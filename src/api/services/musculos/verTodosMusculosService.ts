/**
 * @module VerTodosMusculosService
 */
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter todos os músculos
 */
export class VerTodosMusculosService {
    async execute() {

        const musculos = await client.musculos.findMany({
            select: {
                nome: true,
                img_url: true,
            }
        })
        return { data: musculos, status: 200 };
    }
}