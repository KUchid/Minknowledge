import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      onClose();
    } catch (err) {
      setError('認証に失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative animate-in fade-in duration-200">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? 'ログイン' : '新規登録'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                名前
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<UserIcon className="h-5 w-5" />}
                required={!isLogin}
                placeholder="山田 太郎"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-5 w-5" />}
              required
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              パスワード
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-5 w-5" />}
              required
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
          >
            {isLogin ? 'ログイン' : '登録する'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-blue-600 hover:text-blue-700"
          >
            {isLogin ? 'アカウントをお持ちでない方' : 'すでにアカウントをお持ちの方'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;