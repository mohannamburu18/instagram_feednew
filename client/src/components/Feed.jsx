import { useState, useEffect } from 'react';
import api from '../api';
import PostCard from './PostCard';
import PostViewer from './PostViewer';
import './Feed.css';

function Feed({ onEditClick }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  // ✅ Load like/save from localStorage
  const [likedPosts, setLikedPosts] = useState(() =>
    JSON.parse(localStorage.getItem('likedPosts')) || []
  );
  const [savedPosts, setSavedPosts] = useState(() =>
    JSON.parse(localStorage.getItem('savedPosts')) || []
  );

  // Current user
  const [currentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) return saved;
    const user = `user_${Date.now()}`;
    localStorage.setItem('currentUser', user);
    return user;
  });

  const POSTS_PER_PAGE = 12;

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✅ Persist like/save
  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }, [savedPosts]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/posts?page=1&limit=${POSTS_PER_PAGE}`);
      setPosts(res.data.posts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Like toggle (FIXED)
  const handleLike = async (postId) => {
    const alreadyLiked = likedPosts.includes(postId);

    try {
      if (!alreadyLiked) {
        await api.post(`/posts/${postId}/like`);
      }

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, likes: p.likes + (alreadyLiked ? -1 : 1) }
            : p
        )
      );

      setLikedPosts((prev) =>
        alreadyLiked
          ? prev.filter((id) => id !== postId)
          : [...prev, postId]
      );
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  // ✅ Save toggle (local only)
  const handleSave = (postId) => {
    setSavedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleDelete = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      setViewerOpen(false);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (loading) return <p className="loading-text">Loading posts...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="feed-container">
      <div className="explore-grid">
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            currentUser={currentUser}
            onView={() => {
              setViewerIndex(index);
              setViewerOpen(true);
            }}
          />
        ))}
      </div>

      {viewerOpen && (
        <PostViewer
          posts={posts}
          initialIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
          currentUser={currentUser}
          onLike={handleLike}
          onSave={handleSave}
          onDelete={handleDelete}
          likedPosts={likedPosts}
          savedPosts={savedPosts}
          onEdit={onEditClick}
        />
      )}
    </div>
  );
}

export default Feed;
