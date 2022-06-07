import { SeriesP } from "./seriePlanoProvider";

/**
 * Classe que representa um exercício de um plano
 * @param exercicioBlocoId 
 * @param blocoID id do bloco ao qual o exercicio pertence
 * @param exercicioId id do exercicio
 * @param nOrdem numero de ordem do exercicio
 * @param series series do exercicio
 */
export class ExercicioP {
    exercicioBlocoId: string;
    blocoId: string;
    exercicioId: string;
    nOrdem: number;
    series: Array<SeriesP>;
}