import React from 'react';
import { Heart, MessageCircle, Share2, ExternalLink } from 'lucide-react';
import { usePost } from '@/contexts/PostContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate, getHostnameFromURL } from '@/lib/utils';
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import Avatar from './ui/Avatar';
import Button from './ui/Button';
import PostMenu from './PostMenu';

interface PostCardProps {
  post: {
    id: string;
    userId: string;
    content: string;
    url: string;
    likes: number;
    comments: number;
    isLiked?: boolean;
    createdAt: string;
    user: {
      name: string;
      avatar?: string;
    };
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const { likePost } = usePost();
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar
              src={post.user.avatar}
              alt={post.user.name}
              fallback={post.user.name}
            />
            <div>
              <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
              <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
            </div>
          </div>
          {user?.id === post.userId && <PostMenu postId={post.id} />}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>
        
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gray-50 rounded-lg hover:bg-gray-100 transition overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">
                {getHostnameFromURL(post.url)}
              </span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-blue-600 hover:text-blue-700 transition line-clamp-1">
              {post.url}
            </p>
          </div>
        </a>
      </CardContent>
      
      <CardFooter>
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => likePost(post.id)}
            className={`text-gray-600 hover:text-red-500 ${post.isLiked ? 'text-red-500' : ''}`}
          >
            <Heart className={`h-5 w-5 mr-1.5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{post.likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-blue-500"
          >
            <MessageCircle className="h-5 w-5 mr-1.5" />
            <span className="text-sm font-medium">{post.comments}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-green-500"
          >
            <Share2 className="h-5 w-5 mr-1.5" />
            <span className="text-sm font-medium">共有</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;