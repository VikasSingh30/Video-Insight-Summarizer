import express from 'express';
import { summarizeVideo } from '../controllers/summaryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/summarize', summarizeVideo);

export default router;
