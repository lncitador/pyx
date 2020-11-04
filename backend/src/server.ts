/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({
    message: 'voce esta conectado numa apirest em node!',
  });
});

app.listen(3434, () => {
  console.log('🚀 Server started on http://localhost:3434');
});
