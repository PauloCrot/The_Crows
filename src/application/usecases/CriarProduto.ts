import { Produto } from '../../domain/entities/produto';
import { IProdutoRepository } from '../repo/IProdutoRepository';

// Tipagem apenas para os dados que chegam da requisição
interface CriarProdutoInput {
  nome: string;
  descricao: string;
  preco: number;
  tamanho: string;
  cor: string;
  estoque: number;
}

export class CriarProdutoUseCase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async executar(dados: CriarProdutoInput): Promise<Produto> {
    // 1. Instancia a entidade (aqui as regras de negócio e validações rodam automaticamente)
    const novoProduto = new Produto(
      dados.nome,
      dados.descricao,
      dados.preco,
      dados.tamanho,
      dados.cor,
      dados.estoque
    );

    // 2. Manda o repositório salvar no banco
    const produtoSalvo = await this.produtoRepository.salvar(novoProduto);

    return produtoSalvo;
  }
}