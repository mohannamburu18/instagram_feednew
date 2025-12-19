import { useState, useEffect } from 'react';
import api from '../api';
import PostCard from './PostCard';
import PostViewer from './PostViewer';
import './Feed.css';

function Feed({ onEditClick }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    hasNextPage: false,
  });

  const [currentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) return saved;
    const newUser = `user_${Date.now()}`;
    localStorage.setItem('currentUser', newUser);
    return newUser;
  });

  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem('likedPosts');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedPosts, setSavedPosts] = useState(() => {
    const saved = localStorage.getItem('savedPosts');
    return saved ? JSON.parse(saved) : [];
  });

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const POSTS_PER_PAGE = 12;

  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }, [savedPosts]);

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/api/posts?page=${page}&limit=${POSTS_PER_PAGE}`
      );

      if (page === 1) {
        setPosts(res.data.posts);
      } else {
        setPosts((prev) => [...prev, ...res.data.posts]);
      }

      setPagination(res.data.pagination);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await api.post(`/api/posts/${postId}/like`);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, likes: p.likes + 1 } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((p) => p.id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="feed-container">
      {error && (
        <div className="error-container">
          ⚠️ {error}
          <button onClick={() => fetchPosts(1)}>Try Again</button>
        </div>
      )}

      <div className="explore-grid">
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onDelete={handleDelete}
            onEdit={onEditClick}
            onView={() => {
              setViewerIndex(index);
              setViewerOpen(true);
            }}
            currentUser={currentUser}
          />
        ))}
      </div>

      {viewerOpen && (
        <PostViewer
          posts={posts}
          initialIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
}

export default Feed;
