import { useState, useEffect, useRef } from 'react';
import './PostViewer.css';

function PostViewer({
  posts,
  initialIndex,
  onClose,
  onLike,
  onSave,
  onEdit,
  likedPosts,
  savedPosts
}) {
  const [index, setIndex] = useState(initialIndex);
  const startY = useRef(0);
  const endY = useRef(0);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  const post = posts[index];
  if (!post) return null;

  const isLiked = likedPosts.includes(post.id);
  const isSaved = savedPosts.includes(post.id);

  const next = () => index < posts.length - 1 && setIndex(i => i + 1);
  const prev = () => index > 0 && setIndex(i => i - 1);

  return (
    <div
      className="post-viewer-overlay"
      onTouchStart={e => (startY.current = e.touches[0].clientY)}
      onTouchMove={e => (endY.current = e.touches[0].clientY)}
      onTouchEnd={() => {
        if (startY.current - endY.current > 50) next();
        if (endY.current - startY.current > 50) prev();
      }}
    >
      <button className="viewer-close-btn" onClick={onClose}>✕</button>

      <button className="viewer-nav-btn prev" onClick={prev}>‹</button>
      <button className="viewer-nav-btn next" onClick={next}>›</button>

      <div className="viewer-content">
        <img src={post.image} alt="" className="viewer-image" />

        <div className="viewer-sidebar">
          <p>{post.caption}</p>

          <div className="viewer-actions">
            <button onClick={() => onLike(post.id)}>
              {isLiked ? '❤️' : '🤍'} {post.likes}
            </button>
            <button onClick={() => onSave(post.id)}>
              {isSaved ? '🔖 Saved' : '🏷️ Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostViewer;
