import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/mongo.js';
import authRoutes from '../src/routes/authRoutes.js';
import youtubeRoutes from '../src/routes/youtubeRoutes.js';
import summaryRoutes from '../src/routes/summaryRoutes.js';
import paddleRoutes from './routes/paddleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';



dotenv.config();
console.log('MONGO_URI is set:', !!process.env.MONGO_URI);
console.log('JWT_SECRET is set:', !!process.env.JWT_SECRET);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/paddle', paddleRoutes);
app.use('/api/admin', adminRoutes);


app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to DB', err);
  });

