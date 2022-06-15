import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './src/routes/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
