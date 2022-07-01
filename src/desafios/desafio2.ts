// Como podemos melhorar o esse código usando TS?
enum Profession {
  atriz = "atriz",
  padeiro = "padeiro",
}

interface Person {
  nome: string;
  idade: number;
  profissao: Profession;
}

const pessoa1: Person = {
  nome: "maria",
  idade: 29,
  profissao: Profession.atriz,
};
const pessoa2: Person = {
  nome: "roberto",
  idade: 19,
  profissao: Profession.padeiro,
};
const pessoa3: Person = {
  nome: "laura",
  idade: 32,
  profissao: Profession.atriz,
};
const pessoa4: Person = {
  nome: "carlos",
  idade: 19,
  profissao: Profession.padeiro,
};
