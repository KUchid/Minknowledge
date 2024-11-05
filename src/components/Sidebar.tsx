import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  TrendingUp,
  BookOpen,
  Briefcase,
  Code,
  Globe,
  Activity,
  Coffee
} from 'lucide-react';

const categories = [
  { name: 'ホーム', icon: Home },
  { name: '経済', icon: Briefcase },
  { name: '技術', icon: Code },
  { name: '政治', icon: Globe },
  { name: '科学', icon: BookOpen },
  { name: '運動', icon: Activity },
  { name: '生活', icon: Coffee },
  { name: 'トレンド', icon: TrendingUp },
];

const Sidebar = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <nav className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              to="/"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Icon className="h-5 w-5" />
              <span>{category.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900">プレミアム会員になる</h3>
        <p className="text-sm text-blue-700 mt-1">新機能を利用できます</p>
        <button className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          詳細を見る
        </button>
      </div>
    </div>
  );
};

export default Sidebar;