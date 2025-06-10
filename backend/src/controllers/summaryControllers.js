import { OpenAI } from 'openai';
import { Summary } from '../models/Summary.js';
import { User } from '../models/User.js';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// // Simulated transcript fetch fake one
// const fakeTranscript = `
//   Rick Astley’s “Never Gonna Give You Up” is a classic pop song...
//   [Pretend this is the video transcript extracted from YouTube captions]
// `;

export const summarizeVideo = async (req, res) => {
  const { videoId } = req.body;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  if (!videoId || !title) return res.status(400).json({ message: 'Missing videoId or title' });
  try {

    const user = await User.findById(userId)

    if (!user.isPremium) {
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
      const count = await Summary.countDocuments({
        userId,
        createdAt: { $gte: since }
      });

      if (count >= 3) {
        return res.status(403).json({ message: 'Daily quota exceeded (3/day)' });
      }
    }
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    if (!videoId) return res.status(400).json({ message: 'Missing videoId' });
    // const fakeTranscript = `Rick Astley’s “Never Gonna Give You Up” is a classic pop song...`;
    const fakeTranscript = `Transcript for ${title}...`;


    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Summarize this YouTube video transcript in a few concise sentences.'
        },
        {
          role: 'user',
          content: fakeTranscript // will replace with real transcript
        }
      ],
      temperature: 0.7
    });

    const summary = completion.choices[0].message.content;

    const saved = await Summary.create({
      userId,
      videoId,
      title,
      summary: summaryText
    });


    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate summary' });
  }
};
