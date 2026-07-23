import express, { Request, Response } from 'express';
import produtoRoutes from './routes/produtoRoutes';

const app = express();
const port = 3000;

app.use(express.json());

// AQUI ESTÁ A CORREÇÃO:
// Agora, tudo que estiver dentro de produtoRoutes só será ativado 
// se a URL começar com /produtos
app.use('/produtos', produtoRoutes);

// Rota raiz (teste)
app.get('/', (req: Request, res: Response) => {
  res.send('A API da The Crows está online com POO!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});