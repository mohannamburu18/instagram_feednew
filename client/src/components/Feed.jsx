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
    <>
      <div className="feed-grid">
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
    </>
  );
}

export default Feed;
