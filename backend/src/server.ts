/* eslint-disable no-console */
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes';

import './database';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal error server',
  });
});

app.get('/', (request, response) => {
  return response.json({
    message: 'voce esta conectado numa apirest em node!',
  });
});

app.listen(3434, () => {
  console.log('🚀 Server started on http://localhost:3434');
});
