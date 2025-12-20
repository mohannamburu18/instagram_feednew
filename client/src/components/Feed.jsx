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

  useEffect(() => {
    api.get('/posts').then(res => setPosts(res.data.posts));
  }, []);

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }, [savedPosts]);

  const handleLike = async (id) => {
    const already = likedPosts.includes(id);
    await api.post(`/posts/${id}/like`);

    setPosts(p =>
      p.map(post =>
        post.id === id
          ? { ...post, likes: already ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );

    setLikedPosts(prev =>
      already ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSave = (id) => {
    setSavedPosts(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

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
        ].map(story => (
          <div key={story.id} className="story-item">
            <div className="story-avatar">
              <div className={`story-ring ${story.active ? 'active' : ''}`}>
                <div className="story-content">
                  {story.icon}
                </div>
              </div>
            </div>
            <span className="story-name">{story.name}</span>
          </div>
        ))}
      </div>

      {/* 🔥 EXPLORE GRID */}
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

      {/* POST VIEWER */}
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
