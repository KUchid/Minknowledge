import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePost } from '@/contexts/PostContext';
import PostCard from '@/components/PostCard';
import Button from '@/components/ui/Button';

// モックユーザーデータ
const mockUsers = {
  'user-1': {
    id: 'user-1',
    name: '山田太郎',
    bio: 'テクノロジーと経済の情報をシェアしています。',
    location: '東京',
    website: 'https://example.com/yamada',
    joinedAt: '2024-01-01',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  'user-2': {
    id: 'user-2',
    name: '佐藤花子',
    bio: 'デジタルマーケティングについて発信しています。',
    location: '福岡',
    website: 'https://example.com/sato',
    joinedAt: '2024-02-01',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
};

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const { posts } = usePost();
  
  const isOwnProfile = !userId || userId === user?.id;
  const profileUser = isOwnProfile ? user : mockUsers[userId as keyof typeof mockUsers];
  
  if (!profileUser) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">ユーザーが見つかりません</p>
      </div>
    );
  }

  const userPosts = posts.filter(post => post.userId === profileUser.id);
  const [isFollowing, setIsFollowing] = React.useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="space-y-6">
      {/* プロフィールヘッダー */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600" />
        <div className="px-6 pb-6">
          <div className="flex justify-between items-start -mt-12">
            <img
              src={profileUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileUser.name)}&background=random`}
              alt={profileUser.name}
              className="h-24 w-24 rounded-full border-4 border-white object-cover"
            />
            {isOwnProfile ? (
              <Button variant="secondary" className="mt-14">
                プロフィールを編集
              </Button>
            ) : (
              <Button
                className="mt-14"
                variant={isFollowing ? "secondary" : "primary"}
                onClick={handleFollowClick}
              >
                {isFollowing ? 'フォロー中' : 'フォローする'}
              </Button>
            )}
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold">{profileUser.name}</h1>
            <p className="text-gray-500">@{profileUser.name.toLowerCase().replace(/\s+/g, '')}</p>
          </div>

          <p className="mt-4 text-gray-800">{profileUser.bio}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            {profileUser.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{profileUser.location}</span>
              </div>
            )}
            {profileUser.website && (
              <a
                href={profileUser.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <LinkIcon className="h-4 w-4" />
                <span>{new URL(profileUser.website).hostname}</span>
              </a>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(profileUser.joinedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })}に登録</span>
            </div>
          </div>

          <div className="mt-4 flex gap-6">
            <button className="text-gray-500 hover:text-gray-700">
              <span className="font-bold text-gray-900">123</span> フォロー中
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <span className="font-bold text-gray-900">456</span> フォロワー
            </button>
          </div>
        </div>
      </div>

      {/* 投稿一覧 */}
      <div className="space-y-6">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-gray-500">まだ投稿がありません</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;