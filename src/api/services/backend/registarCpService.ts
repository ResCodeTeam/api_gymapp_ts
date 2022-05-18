import { client } from "../../prisma/client";

interface IRegistarCpRequest {
    cp: number;
    cpExt: number;
    rua: string;
    localidade: string;
}


export class RegistarCpService {
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