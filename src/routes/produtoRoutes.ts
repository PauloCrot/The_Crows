import { Router } from 'express';
import { ProdutoController } from '../presentation/controllers/produto_controller';
import { ProdutoRepository } from '../infra/database/ProdutoRepository';
import { ListarProdutosUseCase } from '../application/usecases/ListarProdutos';

const router = Router();

const repository = new ProdutoRepository();

const useCase = new ListarProdutosUseCase(repository);

const controller = new ProdutoController(useCase);

router.get('/', controller.listarTodos);

export default router;