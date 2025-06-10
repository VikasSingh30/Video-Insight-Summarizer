import crypto from 'crypto';
import { User } from '../models/User.js';

export const handlePaddleWebhook = async (req, res) => {
  try {
    const { email, alert_name, passthrough, p_signature, ...data } = req.body;

    if (alert_name === 'payment_succeeded') {
      const user = await User.findOne({ email });
      if (user) {
        user.isPremium = true;
        await user.save();
        return res.status(200).send('User upgraded to premium');
      }
    }

    res.status(200).send('Webhook received');
  } catch (err) {
    console.error(err);
    res.status(400).send(' Error processing webhook');
  }
};
