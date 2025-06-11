import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Crown 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from '../spi/axios';

const Home = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, dailyCount, addSummary } = useAuth();
  const navigate = useNavigate();

  const validateYouTubeUrl = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    return regex.test(url);
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!validateYouTubeUrl(youtubeUrl)) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post('/youtube/metadata', { url: youtubeUrl });
      setVideoData(res.data);
    } catch {
      alert('Failed to fetch video metadata');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!user.isPremium && dailyCount >= 3) {
      alert('Daily limit reached! Upgrade to Premium for unlimited summaries.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post('/summary/generate', { url: youtubeUrl });
      setSummary(res.data.summary);

      const newEntry = {
        id: res.data._id,
        title: videoData.title,
        videoId: res.data.videoId,
        thumbnail: videoData.thumbnail,
        summary: res.data.summary,
        createdAt: res.data.createdAt,
        channelTitle: videoData.channelTitle
      };
      addSummary(newEntry);
    } catch {
      alert('Failed to generate summary');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistory = () => {
    navigate('/history');
  };

  const handleUpgrade = () => {
    navigate('/upgrade');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Play className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Video Insight</h1>
          <p className="text-gray-600">Summarize YouTube videos effortlessly</p>
        </div>

        <form onSubmit={handleUrlSubmit} className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">YouTube Video URL</label>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter YouTube video URL"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : 'Fetch Video'}
          </button>
        </form>

        {videoData && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <img src={videoData.thumbnail} alt={videoData.title} className="w-full h-auto rounded-lg mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{videoData.title}</h2>
            <p className="text-gray-600 mb-4">Channel: {videoData.channelTitle}</p>
            <p className="text-gray-600 mb-4">Duration: {videoData.duration}</p>
            <button
              onClick={handleSummarize}
              className={`w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : 'Summarize Video'}
            </button>
          </div>
        )}

        {summary && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Summary</h3>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleHistory}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Clock className="w-5 h-5 mr-2" />
            View History
          </button>
          {!user.isPremium && (
            <button
              onClick={handleUpgrade}
              className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
            >
              <Crown className="w-5 h-5 mr-2" />
              Upgrade to Premium
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;
