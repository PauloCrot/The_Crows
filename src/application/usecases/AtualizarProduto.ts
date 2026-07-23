import { Produto } from '../../domain/entities/produto';
import { IProdutoRepository } from '../repo/IProdutoRepository';

interface AtualizarProdutoInput {
  nome: string;
  descricao: string;
  preco: number;
  tamanho: string;
  cor: string;
  estoque: number;
}

export class AtualizarProdutoUseCase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async executar(id: string, dados: AtualizarProdutoInput): Promise<Produto> {
    // 1. Verifica se o produto realmente existe
    const produtoExiste = await this.produtoRepository.buscarPorId(id);
    if (!produtoExiste) {
      throw new Error('Produto não encontrado.');
    }

    // 2. Instancia a Entidade (aqui as validações como "preço não pode ser negativo" vão rodar)
    const produtoAtualizado = new Produto(
      dados.nome,
      dados.descricao,
      dados.preco,
      dados.tamanho,
      dados.cor,
      dados.estoque,
      id // Mantemos o mesmo ID
    );

    // 3. Manda o repositório fazer o UPDATE
    const resultado = await this.produtoRepository.atualizar(id, produtoAtualizado);
    
    if (!resultado) {
      throw new Error('Erro ao atualizar o produto no banco de dados.');
    }

    return resultado;
  }
}