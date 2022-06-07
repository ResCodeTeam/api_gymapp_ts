import { ExercicioP } from "./exercicioPlanoProvider";
/**
 * Classe que representa um bloco de um plano
 * @param blocoId id do bloco
 * @param nome nome do bloco
 * @param descricao descrição do bloco
 * @param nOrdem numero de ordem do bloco
 * @param exercicios exercicios do bloco
 */
export class Bloco {
    blocoId: string;
    nome: string;
    descricao: string;
    nOrdem: number;
    exercicios: Array<ExercicioP>;
}