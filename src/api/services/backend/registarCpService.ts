/**
 * @module RegistarCpService
 */
import { client } from "../../prisma/client";

/**
 * @param cp código postal
 * @param cpExt extensão do código postal
 * @param rua rua associada
 * @param localidade localidade associada
 */
export interface IRegistarCpRequest {
    cp: number;
    cpExt: number;
    rua: string;
    localidade: string;
}

/**
 * Classe responsavel pelo serviço de criação de códigos postais
 */
export class RegistarCpService {
    /**
 * Método que permite inserir um código postal na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param IRegistarCpRequest interface de dados do serviço
 */
    async execute({ cp, cpExt, rua, localidade }: IRegistarCpRequest) {
        await client.localidades.create({
            data: {
                cp,
                cp_ext: cpExt,
                rua: rua.length > 0 ? rua : null,
                localidade
            }
        })
        return { data: "Codigo postal registado com sucesso", status: 200 }
    }
}