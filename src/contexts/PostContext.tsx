import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Post {
  id: string;
  userId: string;
  content: string;
  url: string;
  platform: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  createdAt: string;
  user: {
    name: string;
    avatar?: string;
  };
}

interface PostContextType {
  posts: Post[];
  isLoading: boolean;
  createPost: (content: string, url: string) => Promise<void>;
  updatePost: (id: string, content: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  likePost: (id: string) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: 'user-1',
      content: 'AIの進化について興味深い記事を見つけました。\n\n最新のAI技術の発展が私たちの生活をどのように変えていくのか、とても参考になる内容です。',
      url: 'https://example.com/ai-article',
      platform: 'X',
      likes: 124,
      comments: 23,
      isLiked: false,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      user: {
        name: '山田太郎',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: '2',
      userId: 'user-2',
      content: '今話題のテクノロジートレンドについての解説動画です。\n\n特に Web3 と AI の融合について、分かりやすく説明されています。',
      url: 'https://example.com/tech-trends',
      platform: 'YouTube',
      likes: 89,
      comments: 12,
      isLiked: true,
      createdAt: new Date(Date.now() - 10800000).toISOString(),
      user: {
        name: '佐藤花子',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: '3',
      userId: 'current-user',
      content: 'Web開発の最新トレンドについて共有します。\n\nReactの新機能とパフォーマンス最適化について、実践的な内容です。',
      url: 'https://example.com/web-dev',
      platform: 'Zenn',
      likes: 45,
      comments: 8,
      isLiked: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      user: {
        name: '鈴木一郎',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const createPost = useCallback(async (content: string, url: string) => {
    try {
      setIsLoading(true);
      const newPost: Post = {
        id: Date.now().toString(),
        userId: 'current-user',
        content,
        url,
        platform: new URL(url).hostname,
        likes: 0,
        comments: 0,
        isLiked: false,
        createdAt: new Date().toISOString(),
        user: {
          name: '鈴木一郎',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      };
      setPosts(prev => [newPost, ...prev]);
    } catch (error) {
      console.error('Create post failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePost = useCallback(async (id: string, content: string) => {
    try {
      setIsLoading(true);
      setPosts(prev =>
        prev.map(post =>
          post.id === id ? { ...post, content } : post
        )
      );
    } catch (error) {
      console.error('Update post failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePost = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (error) {
      console.error('Delete post failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const likePost = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setPosts(prev =>
        prev.map(post =>
          post.id === id
            ? {
                ...post,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                isLiked: !post.isLiked
              }
            : post
        )
      );
    } catch (error) {
      console.error('Like post failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <PostContext.Provider value={{ posts, isLoading, createPost, updatePost, deletePost, likePost }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
}