import { useState, useEffect } from 'react';
import './PostViewer.css';

function PostViewer({
  posts,
  initialIndex,
  onClose,
  onLike,
  onSave,
  likedPosts,
  savedPosts,
  onEdit
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const post = posts[currentIndex];

  /* ---------------- KEYBOARD SUPPORT ---------------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextPost();
      if (e.key === 'ArrowLeft') prevPost();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex]);

  /* ---------------- NAVIGATION ---------------- */
  const nextPost = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevPost = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!post) return null;

  return (
    <div className="post-viewer-overlay">
      {/* ❌ CLOSE */}
      <button className="viewer-close-btn" onClick={onClose}>✕</button>

      {/* ⬅ PREV */}
      {currentIndex > 0 && (
        <button className="viewer-nav-btn prev" onClick={prevPost}>
          ‹
        </button>
      )}

      {/* ➡ NEXT */}
      {currentIndex < posts.length - 1 && (
        <button className="viewer-nav-btn next" onClick={nextPost}>
          ›
        </button>
      )}

      {/* CONTENT */}
      <div className="viewer-content">
        {/* IMAGE */}
        <div className="viewer-media">
          <img
            src={post.image}
            alt="Post"
            className="viewer-image"
          />
        </div>

        {/* SIDEBAR */}
        <div className="viewer-sidebar">
          <div className="viewer-top">
            <div className="viewer-header">
              <div className="viewer-author">
                <div className="viewer-avatar">
                  {post.author?.charAt(0).toUpperCase()}
                </div>
                <span className="viewer-author-name">
                  {post.author}
                </span>
              </div>
            </div>

            <div className="viewer-caption">
              {post.caption}
            </div>
          </div>

          <div className="viewer-bottom">
            <div className="viewer-actions">
              <button onClick={() => onLike(post.id)}>
                {likedPosts.includes(post.id) ? '❤️' : '🤍'} {post.likes}
              </button>

              <button onClick={() => onSave(post.id)}>
                {savedPosts.includes(post.id) ? '💾 Saved' : '💾 Save'}
              </button>

              {onEdit && (
                <button onClick={() => onEdit(post)}>
                  ✏️ Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostViewer;
