import { Request, Response } from 'express';
import { ListarProdutosUseCase } from '../../application/usecases/ListarProdutos';
import { CriarProdutoUseCase } from '../../application/usecases/CriarProduto';
import { AtualizarProdutoUseCase } from '../../application/usecases/AtualizarProduto'; // 1. Importação nova

export class ProdutoController {
  constructor(
    private listarProdutosUseCase: ListarProdutosUseCase,
    private criarProdutoUseCase: CriarProdutoUseCase,
    private atualizarProdutoUseCase: AtualizarProdutoUseCase
  ) {}

  listarTodos = async (req: Request, res: Response) => {
    try {
      const produtos = await this.listarProdutosUseCase.executar();
      res.json(produtos);
    } catch (erro) {
      console.error('Erro ao listar produtos:', erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };

  cadastrar = async (req: Request, res: Response) => {
    try {
      const { nome, descricao, preco, tamanho, cor, estoque } = req.body;

      const produtoCriado = await this.criarProdutoUseCase.executar({
        nome, descricao, preco, tamanho, cor, estoque
      });

      res.status(201).json(produtoCriado);
    } catch (erro: any) {
      if (erro instanceof Error) {
        res.status(400).json({ erro: erro.message });
      } else {
        console.error('Erro ao cadastrar produto', erro);
        res.status(500).json({ erro: 'Erro interno do servidor ao cadastrar produto' });
      }
    }
  };

atualizar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string; 

      if (!id) {
        res.status(400).json({ erro: 'O ID do produto é obrigatório.' });
        return; 
      }

      const { nome, descricao, preco, tamanho, cor, estoque } = req.body;

      const produtoAtualizado = await this.atualizarProdutoUseCase.executar(id, {
        nome, descricao, preco, tamanho, cor, estoque
      });

      res.status(200).json(produtoAtualizado); 

    } catch (erro: any) {
      if (erro instanceof Error) {
        if (erro.message === 'Produto não encontrado.') {
          res.status(404).json({ erro: erro.message });
        } else {
          res.status(400).json({ erro: erro.message });
        }
      } else {
        console.error('Erro ao atualizar produto', erro);
        res.status(500).json({ erro: 'Erro interno do servidor ao atualizar produto' });
      }
    }
  };
}