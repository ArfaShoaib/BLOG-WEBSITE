'use client'
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

type Comment = {
  id: string;
  content: string;
  author: string;
  timestamp: number;
};

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const savedComments = localStorage.getItem('blogComments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !author.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment.trim(),
      author: author.trim(),
      timestamp: Date.now(),
    };
    
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem('blogComments', JSON.stringify(updatedComments));
    
    setNewComment('');
  };

  const deleteComment = (id: string) => {
    const filteredComments = comments.filter(comment => comment.id !== id);
    setComments(filteredComments);
    localStorage.setItem('blogComments', JSON.stringify(filteredComments));
  };

  const deleteAllComments = () => {
    setComments([]);
    localStorage.removeItem('blogComments');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        <button 
          onClick={deleteAllComments}
          className="text-red-500 hover:text-red-700"
        >
          Delete All
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded h-24"
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border p-4 rounded">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold">{comment.author}</h3>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(comment.timestamp)} ago
                </span>
              </div>
              <button
                onClick={() => deleteComment(comment.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;