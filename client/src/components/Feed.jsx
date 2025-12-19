import { useState, useEffect } from 'react';
import axios from 'axios';
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
    hasNextPage: false
  });
  
  // Get or create current user
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

  // Post Viewer state
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
      const response = await axios.get(`/api/posts?page=${page}&limit=${POSTS_PER_PAGE}`);
      
      if (page === 1) {
        setPosts(response.data.posts);
      } else {
        setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
      }
      
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    const isLiked = likedPosts.includes(postId);
    
    // Optimistic update
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + (isLiked ? -1 : 1) }
          : post
      )
    );

    // Update liked posts state
    if (isLiked) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }

    // Sync with backend
    try {
      await axios.post(`/api/posts/${postId}/like`);
    } catch (err) {
      console.error('Error liking post:', err);
      // Revert on error
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, likes: post.likes + (isLiked ? 1 : -1) }
            : post
        )
      );
      setLikedPosts(isLiked ? [...likedPosts, postId] : likedPosts.filter(id => id !== postId));
    }
  };

  const handleSave = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    }
  };

  const loadMore = () => {
    if (pagination.hasNextPage) {
      fetchPosts(pagination.currentPage + 1);
    }
  };

  const handleOpenViewer = (index) => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setViewerOpen(false);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="feed-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="feed-container">
        <div className="error-container">
          <p className="error-message">⚠️ {error}</p>
          <button onClick={() => fetchPosts(1)} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="feed-container">
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h2>No posts yet</h2>
          <p>Be the first to create a post!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-container">
      {/* Stories Section */}
      <div className="stories-section">
        <div className="story-item">
          <div className="story-avatar">
            <div className="story-ring">
              <div className="story-content">📸</div>
            </div>
          </div>
          <span className="story-name">Your Story</span>
        </div>
        {['Travel', 'Food', 'Fitness', 'Art', 'Music', 'Nature'].map((name, idx) => (
          <div className="story-item" key={idx}>
            <div className="story-avatar">
              <div className="story-ring active">
                <div className="story-content">{name[0]}</div>
              </div>
            </div>
            <span className="story-name">{name}</span>
          </div>
        ))}
      </div>

      {/* Feed Header */}
      <div className="feed-header">
        <h2>✨ Explore</h2>
        <div className="view-toggles">
          <button className="toggle-btn active">
            <span className="grid-icon">⊞</span>
          </button>
          <button className="toggle-btn">
            <span className="list-icon">☰</span>
          </button>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="explore-grid">
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            isLiked={likedPosts.includes(post.id)}
            isSaved={savedPosts.includes(post.id)}
            onLike={handleLike}
            onSave={handleSave}
            onEdit={onEditClick}
            onDelete={handleDelete}
            gridIndex={index}
            currentUser={currentUser}
            onView={handleOpenViewer}
          />
        ))}
      </div>

      {pagination.hasNextPage && (
        <div className="load-more-container">
          <button 
            onClick={loadMore} 
            className="load-more-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Loading more...
              </>
            ) : (
              <>
                <span className="load-icon">↓</span>
                Load More Posts
              </>
            )}
          </button>
        </div>
      )}

      {!pagination.hasNextPage && posts.length > 0 && (
        <div className="end-message">
          <p>🎉 You've seen it all!</p>
        </div>
      )}

      {/* Post Viewer */}
      {viewerOpen && (
        <PostViewer
          posts={posts}
          initialIndex={viewerIndex}
          onClose={handleCloseViewer}
          currentUser={currentUser}
          onLike={handleLike}
          onSave={handleSave}
          onEdit={onEditClick}
          onDelete={handleDelete}
          likedPosts={likedPosts}
          savedPosts={savedPosts}
        />
      )}
    </div>
  );
}

export default Feed;
