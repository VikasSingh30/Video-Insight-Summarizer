import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Signup failed', error: err.message });

  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.status(200).json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};
