export interface Pedido {
  tamanho: string;
  sabor: string;
  personalizar: { [key: string]: boolean };
}

export interface PizzaTamanho {
  label: string;
  value: string;
  preco: number;
  tempo_preparo: number;
}

export interface PizzaSabor {
  label: string;
  value: string;
  tempo_adicional: number;
}

export interface PizzaPersonalizacao {
  label: string;
  value: string;
  valor_adicional: number;
  tempo_adicional: number;
}

interface PizzaInfoObj<T> {
  [key: string]: T;
}

export interface PizzaAllInfoObj {
  tamanhos: PizzaInfoObj<PizzaTamanho>;
  sabores: PizzaInfoObj<PizzaSabor>;
  personalizacoes: PizzaInfoObj<PizzaPersonalizacao>;
}
