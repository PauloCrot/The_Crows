import { IProdutoRepository } from '../repo/IProdutoRepository';

export class ListarProdutosUseCase {
  // O caso de uso recebe o repositório no construtor (Injeção de Dependência)
  constructor(private produtoRepository: IProdutoRepository) {}

  async executar() {
    // Aqui poderiam entrar validações ou regras de negócio antes de buscar
    const produtos = await this.produtoRepository.listarTodos();
    
    // Poderia ter uma regra: se a lista estiver vazia, disparar um erro
    return produtos;
  }
}

