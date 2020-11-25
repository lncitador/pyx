/* eslint-disable no-console */
import 'reflect-metadata';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import shell from 'shelljs';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

dotenv.config();

const app = express();

app.use(cors());

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

if (process.env.POSTGRES_HOST === 'pyxmobile') {
  // Run external tool synchronously
  if (shell.exec('npm run typeorm migration:run').code !== 0) {
    shell.echo('error');
    shell.exit(1);
  }
}

app.listen(3435);
