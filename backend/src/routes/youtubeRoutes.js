import express from 'express';
import { getMetadata } from '../controllers/youtubeController.js';

const router = express.Router();
router.post('/metadata', getMetadata);

export default router;
