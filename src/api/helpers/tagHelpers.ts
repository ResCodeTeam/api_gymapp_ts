import { client } from "../prisma/client";

let getIniciaisTag = (nome: string) => {
  //separar todos os nomes do aluno
  let splittedName = nome.split(" ");
  //juntar todas as primeiras letras do nome
  let tag = "";
  for (let i = 0; i < splittedName.length; i++) {
    tag += splittedName[i].charAt(0);
  }
  return tag;
};


export async function getTag(nome: string) {
  let hashtag = getIniciaisTag(nome);

  const amount = await client.users.count({
    where: {
      hashtag: {
        startsWith: hashtag,
      }
    }
  })


  // caso o numero seja menor que 9 irá ficar do estilo -> 01
  hashtag += `_${(amount + 1) <= 9 ? "0" + (amount + 1) : (amount + 1)}`;


  return hashtag;
}
export async function getGymTag(nome: string) {
  let hashtag = getIniciaisTag(nome);

  const amount = await client.ginasio.count({
    where: {
      tag: {
        startsWith: hashtag,
      }
    }
  })
  hashtag += `_${(amount + 1) <= 9 ? "0" + (amount + 1) : (amount + 1)}`;
  return hashtag;
}
