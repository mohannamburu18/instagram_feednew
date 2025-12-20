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

  // Current user
  const [currentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) return saved;
    const user = `user_${Date.now()}`;
    localStorage.setItem('currentUser', user);
    return user;
  });

  // Viewer
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const POSTS_PER_PAGE = 12;

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/posts?page=${page}&limit=${POSTS_PER_PAGE}`
      );

      if (page === 1) {
        setPosts(res.data.posts);
      } else {
        setPosts((prev) => [...prev, ...res.data.posts]);
      }

      setPagination(res.data.pagination);
      setError(null);
    } catch (err) {
      console.error('Fetch posts error:', err);
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await api.post(`/posts/${postId}/like`);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, likes: p.likes + 1 } : p
        )
      );
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const loadMore = () => {
    if (pagination.hasNextPage) {
      fetchPosts(pagination.currentPage + 1);
    }
  };

  if (loading && posts.length === 0) {
    return <p className="loading-text">Loading posts...</p>;
  }

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
            currentUser={currentUser}
            onView={() => {
              setViewerIndex(index);
              setViewerOpen(true);
            }}
          />
        ))}
      </div>

      {pagination.hasNextPage && (
        <div className="load-more-container">
          <button onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {viewerOpen && (
        <PostViewer
          posts={posts}
          initialIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
          onLike={handleLike}
          onDelete={handleDelete}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}

export default Feed;
