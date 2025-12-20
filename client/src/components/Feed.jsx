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

  /* ---------------- FETCH POSTS ---------------- */

  useEffect(() => {
    api
      .get('/posts')
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch(() => {
        // ✅ Fallback data (for Vercel / no backend)
        setPosts([
          {
            id: 1,
            author: 'travel_explorer',
            caption: 'Mountain vibes 🏔️',
            image:
              'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
            likes: 120,
          },
          {
            id: 2,
            author: 'foodie_dreams',
            caption: 'Pasta is love 🍝',
            image:
              'https://images.unsplash.com/photo-1529042410759-befb1204b468',
            likes: 89,
          },
          {
            id: 3,
            author: 'fitness_journey',
            caption: 'Leg day 🔥',
            image:
              'https://images.unsplash.com/photo-1517964603305-7217c7f7f47e',
            likes: 210,
          },
          {
            id: 4,
            author: 'urban_photographer',
            caption: 'City lights 🌆',
            image:
              'https://images.unsplash.com/photo-1467269204594-9661b134dd2b',
            likes: 156,
          },
        ]);
      });
  }, []);

  /* ---------------- PERSIST LIKE / SAVE ---------------- */

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }, [savedPosts]);

  /* ---------------- ACTIONS ---------------- */

  const handleLike = async (id) => {
    const alreadyLiked = likedPosts.includes(id);

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

    try {
      await api.post(`/posts/${id}/like`);
    } catch {
      // ignore backend error in production
    }
  };

  const handleSave = (id) => {
    setSavedPosts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="feed-container">
      {/* 🔵 STORIES BAR */}
      <div className="stories-section">
        {[
          { id: 0, name: 'Your Story', icon: '📷', active: true },
          { id: 1, name: 'Travel', icon: 'T' },
          { id: 2, name: 'Food', icon: 'F' },
          { id: 3, name: 'Fitness', icon: 'F' },
          { id: 4, name: 'Art', icon: 'A' },
          { id: 5, name: 'Music', icon: 'M' },
          { id: 6, name: 'Nature', icon: 'N' },
        ].map((story) => (
          <div key={story.id} className="story-item">
            <div className="story-avatar">
              <div className={`story-ring ${story.active ? 'active' : ''}`}>
                <div className="story-content">{story.icon}</div>
              </div>
            </div>
            <span className="story-name">{story.name}</span>
          </div>
        ))}
      </div>

      {/* 🔥 POSTS GRID */}
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

      {/* 🖼 POST VIEWER */}
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
