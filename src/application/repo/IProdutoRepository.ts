export interface IProdutoRepository {
  listarTodos(): Promise<any[]>; // No futuro, troque "any" pela entidade Produto
}
