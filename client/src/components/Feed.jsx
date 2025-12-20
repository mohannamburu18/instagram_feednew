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

  /* FETCH POSTS */
  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data.posts || []))
      .catch(console.error);
  }, []);

  /* LOCK BACKGROUND SCROLL */
  useEffect(() => {
    document.body.style.overflow = viewerOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [viewerOpen]);

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }, [savedPosts]);

  return (
    <div className="feed-container">

      {/* STORIES */}
      <div className="stories-section">
        {['📷','T','F','F','A','M','N'].map((icon, i) => (
          <div key={i} className="story-item">
            <div className="story-ring active">
              <div className="story-content">{icon}</div>
            </div>
            <span className="story-name">
              {['Your Story','Travel','Food','Fitness','Art','Music','Nature'][i]}
            </span>
          </div>
        ))}
      </div>

      {/* GRID */}
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

      {/* FULLSCREEN VIEWER */}
      {viewerOpen && (
        <PostViewer
          posts={posts}
          initialIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
          likedPosts={likedPosts}
          savedPosts={savedPosts}
          onEdit={onEditClick}
        />
      )}
    </div>
  );
}

export default Feed;
