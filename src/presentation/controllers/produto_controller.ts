import { Request, Response } from 'express';
import { ListarProdutosUseCase } from '../../application/usecases/ListarProdutosUseCase';

export class ProdutoController {
  constructor(private listarProdutosUseCase: ListarProdutosUseCase) {}

  listarTodos = async (req: Request, res: Response) => {
    try {
      // O Controller só delega a ação para o Caso de Uso
      const produtos = await this.listarProdutosUseCase.executar();
      
      res.json(produtos);
    } catch (erro) {
      console.error('Erro ao listar produtos:', erro);
      // O Controller lida exclusivamente com a resposta HTTP
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };
}
