import express from 'express';
import { summarizeVideo } from '../controllers/summaryControllers.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/summarize', summarizeVideo);

export default router;
