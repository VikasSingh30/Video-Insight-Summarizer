import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: String, required: true },
  title: { type: String },
  summary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Summary = mongoose.model('Summary', summarySchema);
