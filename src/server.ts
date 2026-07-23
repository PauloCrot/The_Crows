import express, { Request, Response } from 'express';
import produtoRoutes from './routes/produtoRoutes';

const app = express();
const port = 3000;

app.use(express.json());

// Dizendo para o Express usar o nosso arquivo de rotas
app.use(produtoRoutes);

// Rota raiz (teste)
app.get('/', (req: Request, res: Response) => {
  res.send('A API da The Crows está online com POO!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});