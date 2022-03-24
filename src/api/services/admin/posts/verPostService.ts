import { client } from "../../../prisma/client";

interface IVerPost{
    publicacoes : string
}

class VerPostService{
    async execute(){
        let posts = [];
        const publicacoes = await client.publicacoes.findAll()
            for (let i=0; i<publicacoes.length; i++){
                posts.push(publicacoes[i]['dataValues']) // fazer um append numa lista destes valores
            }
            console.log(posts)
        return {
            msg: "Publicação carregada",
            posts
        }
    }
}

export { VerPostService };

