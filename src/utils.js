export const formatarPreco = valor =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
