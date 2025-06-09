import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/mongo.js';
import authRoutes from '../src/routes/authRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);


app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
