
import { checkUserIdExists } from "../../helpers/dbHelpers";
import { verificarAdminTreinador } from "../../middlewares/verificarAdminTreinador";
import { client } from "../../prisma/client";
import { VerTodasAtividadesService } from "../atividades/verTodasAtividadesService";
import { VerTodosPostsUserService } from "../posts/obter/verTodosPostsUserService";
import { VerTreinosAlunosService } from "../treinos/verTreinosAlunosService";

export class VerPerfilService{
    async execute(uId:string, auId:string){

        const exists_perfil= await checkUserIdExists(uId)
        if(!exists_perfil){
            throw new Error("Utilizador não existe")
        }

        const perfil = await client.users.findMany({
            where:{
                uid:uId,
                isDeleted:false
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
        
        const funcao = await client.users.findFirst({
            where: {
                uid: auId
            },
            select: {
                funcoes : {
                    select: {
                        descricao : true
                    }
                }
            }
        });

        if (perfil[0].definicoes_user.is_privado) {
            if (funcao.funcoes.descricao == "Administrador" || funcao.funcoes.descricao == "Treinador") {
                const verTodosTreinosUserService = new VerTreinosAlunosService();
                const treinos = await verTodosTreinosUserService.execute(uId);
                return {perfil, treinos};
            }
            return perfil;
        }

        const verTodosPostsUserService = new VerTodosPostsUserService();
        const posts = await verTodosPostsUserService.execute(uId);

        const verTodosTreinosUserService = new VerTreinosAlunosService();
        const treinos = await verTodosTreinosUserService.execute(uId);
        
        return {perfil, posts, treinos};
    }
}


