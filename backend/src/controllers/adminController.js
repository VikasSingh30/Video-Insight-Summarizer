import { User } from '../models/User.js';

export const listUsers = async (req, res) => {
  const users = await User.find({}, 'email isPremium role createdAt');
  res.json(users);
};
