import { Router } from 'express';
import { ProdutoController } from '../controllers/ProdutoController';

const router = Router();
const produtoController = new ProdutoController();

// Quando acessarem GET /produtos, o método listarTodos da classe entra em ação
router.get('/produtos', produtoController.listarTodos);

export default router;