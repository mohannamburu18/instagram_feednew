import { useState, useEffect } from 'react';
import api from '../api';
import PostCard from './PostCard';
import PostViewer from './PostViewer';
import './Feed.css';

function Feed({ onEditClick }) {
  const [posts, setPosts] = useState([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const [likedPosts, setLikedPosts] = useState(
    JSON.parse(localStorage.getItem('likedPosts')) || []
  );
  const [savedPosts, setSavedPosts] = useState(
    JSON.parse(localStorage.getItem('savedPosts')) || []
  );

  /* ================= FETCH POSTS ================= */
  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error('Fetch posts failed:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* ================= SCROLL LOCK ================= */
  useEffect(() => {
    document.body.style.overflow = viewerOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [viewerOpen]);

  /* ================= LIKE ================= */
  const handleLike = async (id) => {
    const alreadyLiked = likedPosts.includes(id);

    try {
      await api.post(`/posts/${id}/like`);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, likes: alreadyLiked ? p.likes - 1 : p.likes + 1 }
            : p
        )
      );

      setLikedPosts((prev) =>
        alreadyLiked ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= SAVE ================= */
  const handleSave = (id) => {
    setSavedPosts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }, [savedPosts]);

  return (
    <div className="feed-container">

      {/* ============ STORIES BAR ============ */}
      <div className="stories-section">
        {[
          { icon: '📷', label: 'Your Story' },
          { icon: 'T', label: 'Travel' },
          { icon: 'F', label: 'Food' },
          { icon: 'F', label: 'Fitness' },
          { icon: 'A', label: 'Art' },
          { icon: 'M', label: 'Music' },
          { icon: 'N', label: 'Nature' },
        ].map((s, i) => (
          <div key={i} className="story-item">
            <div className="story-ring active">
              <div className="story-content">{s.icon}</div>
            </div>
            <span className="story-name">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ============ EXPLORE GRID ============ */}
      <div className="explore-grid">
        {posts.map((post, i) => (
          <PostCard
            key={post.id}
            post={post}
            onView={() => {
              setViewerIndex(i);
              setViewerOpen(true);
            }}
          />
        ))}
      </div>

      {/* ============ POST VIEWER ============ */}
      {viewerOpen && (
        <PostViewer
          posts={posts}
          initialIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
          onLike={handleLike}
          onSave={handleSave}
          likedPosts={likedPosts}
          savedPosts={savedPosts}
          onEdit={onEditClick}
        />
      )}
    </div>
  );
}

export default Feed;
