import React, { useState } from 'react';
import { Link } from 'lucide-react';
import { usePost } from '@/contexts/PostContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const CreatePost = () => {
  const { createPost, isLoading } = usePost();
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await createPost(content, url);
      setUrl('');
      setContent('');
    } catch (err) {
      setError('投稿の作成に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">新規投稿</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            icon={<Link className="h-5 w-5" />}
            placeholder="https://example.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            コメント
          </label>
          <div className="relative">
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="この記事について一言..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              maxLength={280}
              required
            />
            <span className="absolute bottom-2 right-2 text-sm text-gray-500">
              {content.length}/280
            </span>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
        >
          投稿する
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;