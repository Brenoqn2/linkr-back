import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import AppRouter from './src/router/AppRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(AppRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
