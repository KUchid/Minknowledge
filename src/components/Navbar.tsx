import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, LogOut, Plus, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import CreatePostModal from '@/components/CreatePostModal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  ミンナレッジ
                </span>
              </Link>
            </div>

            <form
              onSubmit={handleSearch}
              className="hidden md:block flex-1 max-w-xl mx-8"
            >
              <Input
                type="search"
                placeholder="検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="h-5 w-5" />}
                className="w-full"
              />
            </form>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      2
                    </span>
                  </Button>
                  
                  <div className="relative">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center space-x-2 hover:opacity-80 transition"
                    >
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    </button>
                    
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          プロフィール
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleLogout}
                          className="w-full justify-start px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          ログアウト
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <Button size="sm" onClick={() => setIsCreatePostModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    投稿する
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    ログイン
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    新規登録
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <form onSubmit={handleSearch}>
                <Input
                  type="search"
                  placeholder="検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-5 w-5" />}
                />
              </form>
              
              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    プロフィール
                  </Link>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Bell className="h-5 w-5 mr-2" />
                    通知
                  </Button>
                  <Button
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsCreatePostModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    投稿する
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    ログアウト
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    ログイン
                  </Button>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    新規登録
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
      />
    </>
  );
};

export default Navbar;