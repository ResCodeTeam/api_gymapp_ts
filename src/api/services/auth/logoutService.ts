import { getUserByID } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class LogoutService{
    async execute(userId:string){
        const user =await getUserByID(userId)
        if(!user){
            throw new Error("User inexistente")
        }

        if(!user.refresh_token){
            throw new Error("Sessão invalida")
        }

        await client.users.update({
            data:{
                refresh_token:null
            },
            where:{
                uid:userId
            }
        })

        
        return {"msg":"Logout com sucesso"}
    }
}