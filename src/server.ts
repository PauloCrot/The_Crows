import express, { Request, Response } from 'express';
import { Produto } from './models/Produto';

const app = express();
const port = 3000;

app.use(express.json());

// Simulando um banco de dados em memória
const bancoDeRoupas: Produto[] = [
  {
    id: '1',
    nome: 'Camiseta Oversized The Crows',
    descricao: 'Camiseta 100% algodão com corte largo',
    preco: 89.9,
    tamanho: 'G',
    cor: 'Preto',
    estoque: 15,
  },
  {
    id: '2',
    nome: 'Calça Cargo Utilitária',
    descricao: 'Calça resistente com 6 bolsos',
    preco: 159.9,
    tamanho: '42',
    cor: 'Verde Militar',
    estoque: 8,
  },
];

// Rota raiz (teste)
app.get('/', (req: Request, res: Response) => {
  res.send('A API da The Crows está online!');
});

// A Rota que estava faltando ou não tinha sido salva
app.get('/produtos', (req: Request, res: Response) => {
  res.json(bancoDeRoupas);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
