import express from 'express';
import { Routes } from './routes/index.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Routes);

app.get('/', (_, res) => {
  res.json({ message: 'API em execução!' });
});

app.listen(3333, () => {
  console.log(`Servidor em execucao na porta 3333`);
});

//adicionado somente para fins de teste
app.use(express.static('assets'));
