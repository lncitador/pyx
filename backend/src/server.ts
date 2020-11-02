/* eslint-disable no-console */
import express from 'express';

const app = express();

app.listen(3333, () => {
  console.log('🚀 Server started on http://localhost:3333');
});
