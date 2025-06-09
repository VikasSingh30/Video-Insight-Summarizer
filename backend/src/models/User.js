import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isPremium: { type: Boolean, default: false },
    quotaUsedToday: { type: Number, default: 0 },
    lastQuotaReset: { type: Date, default: Date.now },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
