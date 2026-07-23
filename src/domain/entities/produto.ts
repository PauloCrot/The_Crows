export class Produto {
  public id?: string | undefined;
  public nome: string;
  public descricao: string;
  public preco: number;
  public tamanho: string;
  public cor: string;
  public estoque: number;

  constructor(
    nome: string, 
    descricao: string, 
    preco: number, 
    tamanho: string, 
    cor: string, 
    estoque: number,
    id?: string
  ) {
    // Aqui entram as regras de negócio puras (Validações de Domínio)
    if (preco < 0) {
      throw new Error("O preço do produto não pode ser negativo.");
    }
    if (estoque < 0) {
      throw new Error("O estoque inicial não pode ser negativo.");
    }
    if (!nome || nome.trim() === "") {
      throw new Error("O produto precisa ter um nome.");
    }

    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.tamanho = tamanho;
    this.cor = cor;
    this.estoque = estoque;
  }
}
