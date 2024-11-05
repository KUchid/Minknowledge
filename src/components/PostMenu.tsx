import React, { useState } from 'react';
import { MoreVertical, Trash2, Edit } from 'lucide-react';
import { usePost } from '../contexts/PostContext';

interface PostMenuProps {
  postId: string;
}

const PostMenu = ({ postId }: PostMenuProps) => {
  const { deletePost } = usePost();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePost(postId);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition"
      >
        <MoreVertical className="h-5 w-5 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
          >
            <Trash2 className="h-4 w-4" />
            <span>削除</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostMenu;