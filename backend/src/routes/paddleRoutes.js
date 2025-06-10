import express from 'express';
import { handlePaddleWebhook } from '../controllers/paddleWebhook.js';

const router = express.Router();
router.post('/webhook', express.urlencoded({ extended: true }), handlePaddleWebhook);

export default router;
