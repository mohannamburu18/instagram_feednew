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
 useEffect(() => {
  let mounted = true;

  api
    .get('/posts')
    .then((res) => {
      if (!mounted) return;

      // backend returns { success, posts, pagination }
      setPosts(res.data.posts || []);
    })
    .catch((err) => {
      console.error('Failed to load posts:', err);
      setPosts([]);
    });

  return () => {
    mounted = false;
  };
}, []);


  /* ================= LIKE HANDLER ================= */
  const handleLike = async (id) => {
    const alreadyLiked = likedPosts.includes(id);

    try {
      await api.post(`/posts/${id}/like`);

      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? {
                ...post,
                likes: alreadyLiked ? post.likes - 1 : post.likes + 1,
              }
            : post
        )
      );

      setLikedPosts((prev) =>
        alreadyLiked ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  /* ================= SAVE HANDLER ================= */
  const handleSave = (id) => {
    setSavedPosts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ================= LOCAL STORAGE ================= */
  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }, [savedPosts]);

  return (
    <div className="feed-container">
      {/* ================= STORIES ================= */}
      <div className="stories-section">
        {[
          { icon: '📷', label: 'Your Story' },
          { icon: 'T', label: 'Travel' },
          { icon: 'F', label: 'Food' },
          { icon: 'F', label: 'Fitness' },
          { icon: 'A', label: 'Art' },
          { icon: 'M', label: 'Music' },
          { icon: 'N', label: 'Nature' },
        ].map((story, i) => (
          <div key={i} className="story-item">
            <div className="story-ring active">
              <div className="story-content">{story.icon}</div>
            </div>
            <span className="story-name">{story.label}</span>
          </div>
        ))}
      </div>

      {/* ================= POSTS GRID ================= */}
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

      {/* ================= FULLSCREEN VIEWER ================= */}
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
