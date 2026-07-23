import { pool } from './db';
import { Produto } from '../../domain/entities/produto';
import { IProdutoRepository } from '../../application/repo/IProdutoRepository';

export class ProdutoRepository implements IProdutoRepository {
  
  async listarTodos(): Promise<Produto[]> {
    const resultado = await pool.query('SELECT * FROM produtos');
    return resultado.rows;
  }

  async salvar(produto: Produto): Promise<Produto> {
    // Usamos $1, $2, etc., para evitar SQL Injection
    const query = `
      INSERT INTO produtos (nome, descricao, preco, tamanho, cor, estoque)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    
    const values = [
      produto.nome,
      produto.descricao,
      produto.preco,
      produto.tamanho,
      produto.cor,
      produto.estoque
    ];

    const resultado = await pool.query(query, values);
    const linha = resultado.rows[0];

    // Montamos o produto devolvendo o ID que o PostgreSQL acabou de gerar
    return new Produto(
      linha.nome,
      linha.descricao,
      Number(linha.preco),
      linha.tamanho,
      linha.cor,
      linha.estoque,
      linha.id 
    );
  }
}