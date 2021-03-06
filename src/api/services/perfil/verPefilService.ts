/**
 * @module VerPerfilService
 */
import { checkMobilidadeMarcaUser, checkUserIdExists, checkUserIdIsDeleted, getDonoMarca, getFuncaoId, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { VerTodosPostsUserService } from "../posts/obter/verTodosPostsUserService";
import { VerTreinosAlunosService } from "../treinos/verTreinosAlunosService";

/**
 * Classe responsavel pelo serviço que serve para obter o perfil de outros utilizadores
 */
export class VerPerfilService {
    /**
     * Método que permite obter o perfil de um utilizador dado o seu id tendo em conta todas as verificações necessárias
     * @param uId id do utilizador
     * @param auId id do utilizador autenticado
    
     */
    async execute(uId: string, auId: string) {

        const exists_perfil = await checkUserIdExists(uId);
        if (!exists_perfil) {
            return { data: "Utilizador não existe", status: 500 }

        }
        console.log(456);
        const is_deleted_perfil = await checkUserIdIsDeleted(uId);
        console.log(is_deleted_perfil)
        if (is_deleted_perfil) {
            return { data: "Utilizador não existe", status: 500 }

        }
        console.log(789);

        const funcao_user_autenticado = await getUserFuncao(auId);
        const treinador = await getFuncaoId("Treinador");
        const admin = await getFuncaoId("Administrador");

        const funcao_user = await getUserFuncao(uId);

        // Treinador
        if (funcao_user_autenticado == treinador) {
            console.log('Autenticação: Treinador');
            const marca_treinador_autenticado = await getTreinadorMarca(auId);
            const dono_marca_autenticado = await getDonoMarca(marca_treinador_autenticado);
            // treinador a ver o peril de um treinador
            if (funcao_user == treinador) {
                const marca_treinador = await getTreinadorMarca(uId);
                if (marca_treinador_autenticado != marca_treinador) {
                    return { data: "Não possui permissão", status: 500 }
                }
            }
            // treinador a ver o perfil de um admin
            else if (funcao_user == admin) {
                console.log(123);
                if (dono_marca_autenticado != uId) {
                    return { data: "Não possui permissão", status: 500 }
                }
            }
            // treinador a ver o perfil de um aluno
            else {
                const { mobilidade, id } = await checkMobilidadeMarcaUser(uId);
                if (mobilidade) {
                    if (id['marca_id'] != marca_treinador_autenticado) {
                        return { data: "Não possui permissão", status: 500 }
                    }
                }
                else {
                    const marca_gym = (await getMarcaGym(id['ginasio_id'])).marca_id;
                    if (marca_gym != marca_treinador_autenticado) {
                        return { data: "Não possui permissão", status: 500 }
                    }
                }
            }
        }
        // Admin
        else if (funcao_user_autenticado == admin) {
            const { mobilidade, id } = await checkMobilidadeMarcaUser(uId);

            // admin a ver o peril de um treinador
            if (funcao_user == treinador) {
                const marca_treinador = await getTreinadorMarca(uId);
                const dono_marca = await getDonoMarca(marca_treinador);

                if (auId != dono_marca) {
                    return { data: "Não possui permissão", status: 500 }
                }
            }
            // admin a ver o peril de um admin
            else if (funcao_user == admin) {
                return { data: "Erro! Não pode ver outro admin", status: 500 }

            }
            // admin a ver o peril de um aluno
            else {
                if (mobilidade) {
                    const dono_marca = await getDonoMarca(id['marca_id']);

                    if (auId != dono_marca) {
                        return { data: "Não possui permissão", status: 500 }
                    }
                }
                else {
                    console.log(123);
                    const marca_gym = await getMarcaGym(id['ginasio_id']);
                    if (auId != marca_gym.dono_id) {
                        return { data: "Não possui permissão", status: 500 }
                    }
                }
            }
        }
        // Aluno
        else {
            // aluno a ver o peril de um treinador
            if (funcao_user == treinador) {
                const { mobilidade, id } = await checkMobilidadeMarcaUser(auId);
                const marca_treinador = await getTreinadorMarca(uId);

                if (mobilidade) {
                    if (id['marca_id'] != marca_treinador) {
                        return { data: "Não possui permissão", status: 500 }
                    }
                }
                else {
                    const marca_gym = (await getMarcaGym(id['ginasio_id'])).marca_id;

                    if (marca_gym != marca_treinador) {
                        return { data: "Não possui permissão", status: 500 }
                    }
                }
            }
            // aluno a ver perfil de admin
            else if (funcao_user == admin) {
                const { mobilidade, id } = await checkMobilidadeMarcaUser(auId);
                if (mobilidade) {
                    const dono_marca = await getDonoMarca(id['marca_id'])
                    if (dono_marca != uId) {
                        return { data: "Não possui permissão", status: 500 }
                    }
                }
                else {
                    const marca_gym = (await getMarcaGym(id['ginasio_id'])).marca_id;
                    const dono_marca = await getDonoMarca(marca_gym);
                    if (dono_marca != uId) {
                        return { data: "Não possui permissão", status: 500 }
                    }
                }
            }
            // aluno a ver perfil de outro aluno
            else {
                const { mobilidade, id } = await checkMobilidadeMarcaUser(auId);
                const id_marca_autenticado = (mobilidade ? id['marca_id'] : id['ginasio_id']);

                if (mobilidade) {
                    const { mobilidade, id } = await checkMobilidadeMarcaUser(uId);

                    if (mobilidade) {
                        if (id_marca_autenticado != id['marca_id']) {
                            return { data: "Não possui permissão", status: 500 }
                        }
                    }
                    else {
                        return { data: "Não possui permissão", status: 500 }
                    }
                }
                else {
                    const { mobilidade, id } = await checkMobilidadeMarcaUser(uId);

                    if (mobilidade) {
                        return { data: "Não possui permissão", status: 500 }
                    }
                    else {
                        if (id_marca_autenticado != id['ginasio_id']) {
                            return { data: "Não possui permissão", status: 500 }
                        }
                    }
                }
            }
        }
        console.log("Aqui");

        const perfil = await client.users.findMany({
            where: {
                uid: uId,
                isDeleted: false
            },
            select: {
                nome: true,
                hashtag: true,
                descricao: true,
                imagem_url: true,
                definicoes_user: {
                    select: {
                        is_privado: true
                    }
                }
            }
        });
        console.log(perfil)
        const funcao = await client.users.findFirst({
            where: {
                uid: auId,
                isDeleted: false
            },
            select: {
                funcoes: {
                    select: {
                        descricao: true
                    }
                }
            }
        });

        if (perfil[0].definicoes_user.is_privado) {
            if (funcao.funcoes.descricao == "Administrador" || funcao.funcoes.descricao == "Treinador") {
                const verTodosTreinosUserService = new VerTreinosAlunosService();
                const treinos = await verTodosTreinosUserService.execute(uId);
                return { data: { perfil, treinos }, status: 200 };
            }
            return { data: perfil, status: 200 };
        }

        const verTodosPostsUserService = new VerTodosPostsUserService();
        const posts = await verTodosPostsUserService.execute(uId);

        const verTodosTreinosUserService = new VerTreinosAlunosService();
        const treinos = await verTodosTreinosUserService.execute(uId);

        return { data: { perfil, posts, treinos }, status: 200 };
    }
}