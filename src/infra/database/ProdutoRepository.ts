import { pool } from './db';
import { Produto } from '../../domain/entities/produto';
import { IProdutoRepository } from '../../application/repo/IProdutoRepository';

export class ProdutoRepository implements IProdutoRepository {
  
  async listarTodos(): Promise<Produto[]> {
    const resultado = await pool.query('SELECT * FROM produtos');
    return resultado.rows;
  }

  async salvar(produto: Produto): Promise<Produto> {
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

  async buscarPorId(id: string): Promise<Produto | null> {
    const resultado = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
    
    if (resultado.rows.length === 0) {
      return null;
    }
    
    const linha = resultado.rows[0];
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

  async atualizar(id: string, produto: Produto): Promise<Produto | null> {
    const query = `
      UPDATE produtos
      SET nome = $1, descricao = $2, preco = $3, tamanho = $4, cor = $5, estoque = $6
      WHERE id = $7
      RETURNING *;
    `;
    
    const values = [
      produto.nome, 
      produto.descricao, 
      produto.preco, 
      produto.tamanho, 
      produto.cor, 
      produto.estoque, 
      id
    ];

    const resultado = await pool.query(query, values);
    
    if (resultado.rows.length === 0) {
      return null;
    }
    
    const linha = resultado.rows[0];
    return new Produto(
      linha.nome, 
      linha.descricao, 
      Number(linha.preco), 
      linha.tamanho, 
      linha.cor, 
      linha.id 
    );
  }
}