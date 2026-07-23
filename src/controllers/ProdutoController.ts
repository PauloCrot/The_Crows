import { Request, Response } from 'express';
import { pool } from '../database/db';

export class ProdutoController {
  
  // Método da classe encapsulado como arrow function para não perder o escopo
  listarTodos = async (req: Request, res: Response) => {
    try {
      const resultado = await pool.query('SELECT * FROM produtos');
      res.json(resultado.rows);
    } catch (erro) {
      console.error('Erro na query:', erro);
      res.status(500).json({ erro: 'Erro ao buscar produtos no banco de dados' });
    }
  };

  // No futuro, os próximos métodos entrarão aqui:
  // cadastrarProduto = async (...) => {}
  // atualizarProduto = async (...) => {}
}