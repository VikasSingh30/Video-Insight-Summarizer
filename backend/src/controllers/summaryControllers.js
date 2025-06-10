import { OpenAI } from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// // Simulated transcript fetch fake one
// const fakeTranscript = `
//   Rick Astley’s “Never Gonna Give You Up” is a classic pop song...
//   [Pretend this is the video transcript extracted from YouTube captions]
// `;

export const summarizeVideo = async (req, res) => {
  try {
        const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    // const { videoId } = req.body;
    // if (!videoId) return res.status(400).json({ message: 'Missing videoId' });
    const fakeTranscript = `
  Rick Astley’s “Never Gonna Give You Up” is a classic pop song...
  [Pretend this is the video transcript extracted from YouTube captions]
`;

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

    
    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate summary' });
  }
};
