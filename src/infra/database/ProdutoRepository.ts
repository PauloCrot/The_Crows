import { pool } from '../database/db';
import { IProdutoRepository } from '../../application/repo/IProdutoRepository';

export class ProdutoRepository implements IProdutoRepository {
  async listarTodos(): Promise<any[]> {
    const resultado = await pool.query('SELECT * FROM produtos');
    return resultado.rows;
  }
}
