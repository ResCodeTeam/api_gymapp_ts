/**
 * @module RegistarAdminService
 */
import { hash } from "bcrypt";
import { checkEmail, getFuncaoId } from "../../helpers/dbHelpers";
import { getTag } from "../../helpers/tagHelpers";
import { client } from "../../prisma/client";

/**
 * @param email email que o admin deseja ter
 * @param nome nome do admin
 * @param password password que o admin deseja ter
 * @param dataNasc data de nascimento do admin
 * @param dataEntrada data em que o admin se juntou à aplicação
 * @param genero genero do admin
 */
export interface IRegistarAdminService {
    email: string,
    nome: string,
    password: string,
    dataNasc: Date,
    dataEntrada: Date,
    genero: number,
}

/**
 * Classe responsavel pelo serviço de registo de um admin
 */
export class RegistarAdminService {
    async execute({ email, nome, password, dataNasc, dataEntrada, genero }: IRegistarAdminService) {

        // verificar se o aluno já está registado
        let existsEmail = await checkEmail(email);
        if (existsEmail) {
            return { data: "Email já registado!", status: 500 }
        }

        // Obter tag do aluno
        let hashtag = await getTag(nome);

        //encriptar a password do aluno
        let passwd = await hash(password, 8);

        // obter o id da função
        let funcaoId = await getFuncaoId("Administrador")


        const admin = await client.users.create({
            data: {
                email,
                nome,
                password: passwd,
                data_nasc: dataNasc,
                hashtag,
                data_entrada: dataEntrada,
                genero,
                funcao_id: funcaoId,
            }
        })
        await client.definicoes_user.create({
            data: {
                identificacoes: true,
                is_privado: false,
                mencoes: true,
                usersuid: admin.uid
            }
        })

        return { data: admin, status: 200 };
    }
}