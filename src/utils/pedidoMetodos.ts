import {
  Pedido,
  PizzaAllInfoObj,
  PizzaPersonalizacao,
  PizzaSabor,
  PizzaTamanho,
} from "../types";

// calcula tempo de preparo do pedido
export const calcularTempoPreparo = (
  pedido: Pedido,
  info: PizzaAllInfoObj
): number => {
  const { tamanhos, sabores, personalizacoes } = info;

  if (!pedido.tamanho || !tamanhos[pedido.tamanho]) return 0;

  // tempo de preparo do tamanho, e adiciona o tempo_adicional dependendo do sabor escolhido
  let tempoPreparo = tamanhos[pedido.tamanho].tempo_preparo;
  tempoPreparo += sabores[pedido.sabor].tempo_adicional || 0;

  // adiciona tempo adicional das personalizacoes ao valor total
  const personalizacoesPizza = Object.keys(pedido.personalizar);
  personalizacoesPizza.forEach((personalizacao: string) => {
    if (pedido.personalizar[personalizacao])
      tempoPreparo += personalizacoes[personalizacao].tempo_adicional;
  });

  return tempoPreparo;
};

// Calcula valor total do pedido
export const calcularValorTotal = (
  pedido: Pedido,
  info: PizzaAllInfoObj
): number => {
  const { tamanhos, personalizacoes } = info;

  if (!pedido.tamanho || !tamanhos[pedido.tamanho]) return 0;

  let total = 0;
  total += tamanhos[pedido.tamanho].preco;

  // adiciona tempo adicional das personalizacoes ao valor total
  const personalizacoesPizza = Object.keys(pedido.personalizar);
  personalizacoesPizza.forEach((personalizacao: string) => {
    if (pedido.personalizar[personalizacao])
      total += personalizacoes[personalizacao].valor_adicional;
  });

  return total;
};

interface ResponseInfoContent {
  personalizacoes: PizzaPersonalizacao[];
  tamanhos: PizzaTamanho[];
  sabores: PizzaSabor[];
}

type ArrayInfo = PizzaSabor[] | PizzaPersonalizacao[] | PizzaTamanho[];

// Dado um array ou de sabores ou personalizacoes ou tamanhos, cria um objeto em que possa referenciar cada item por seu valor (HashTable)
// para evitar percorrer o vetor toda hora para pegar o elemento.
// ex: pizzaSabor[] -> { "calabresa" => {...}, "portuguesa" => {...}, ...}
export const criaItemInfoObj = (arrayInfo: ArrayInfo) => {
  const newObj: { [key: string]: any } = {};

  arrayInfo.forEach((item) => {
    const newKey = item.value;
    if (newKey) newObj[newKey] = item;
  });

  return newObj;
};

// cria o objeto de info para todas as chaves: sabores, personalizacoes e tamanhos
export const criaInfoObj = (responseInfoContent: ResponseInfoContent) => {
  const newObj: { [k: string]: any } = {};
  const keys = Object.keys(responseInfoContent);

  keys.forEach((keyItem) => {
    // @ts-ignore
    newObj[keyItem] = criaItemInfoObj(responseInfoContent[keyItem]);
  });

  return newObj;
};
