import React from 'react';
import { usePost } from '@/contexts/PostContext';
import { useAuth } from '@/contexts/AuthContext';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

const Feed = () => {
  const { posts } = usePost();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {user && <CreatePost />}
      
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">まだ投稿がありません</p>
        </div>
      )}
    </div>
  );
};

export default Feed;