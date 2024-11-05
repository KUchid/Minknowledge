import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';
import { TrendingUp } from 'lucide-react';

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <Sidebar />
                </div>
                <main className="lg:col-span-6">
                  <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/:userId" element={<Profile />} />
                  </Routes>
                </main>
                <aside className="lg:col-span-3">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">トレンド</h2>
                    <div className="space-y-4">
                      {['経済', '技術', '政治'].map((category) => (
                        <div key={category} className="flex items-center gap-3">
                          <TrendingUp className="w-5 h-5 text-blue-500" />
                          <span>{category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;