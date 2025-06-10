import axios from 'axios';

export const getMetadata = async (req, res) => {
  try {
    const { url } = req.body;

    const videoIdMatch = url.match(/v=([a-zA-Z0-9_-]{11})/);
    if (!videoIdMatch) return res.status(400).json({ message: 'Invalid YouTube URL' });

    const videoId = videoIdMatch[1];
    const apiKey = process.env.YOUTUBE_API_KEY;

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`,
      {
        params: {
          id: videoId,
          part: 'snippet,contentDetails',
          key: apiKey
        }
      }
    );

    const video = response.data.items[0];
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.high.url;
    const duration = video.contentDetails.duration;

    res.json({ title, thumbnail, duration });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch metadata' });
  }
};
