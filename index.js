import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

import { connectDb } from './database/db.js'; 

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors()); 
app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDb();
  });