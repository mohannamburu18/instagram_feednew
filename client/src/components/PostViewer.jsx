import { useState, useEffect, useRef } from 'react';
import './PostViewer.css';

function PostViewer({
  posts = [],
  initialIndex = 0,
  onClose,
  currentUser,
  onLike,
  onSave,
  onEdit,
  onDelete,
  likedPosts = [],
  savedPosts = [],
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showMenu, setShowMenu] = useState(false);

  const viewerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  // ✅ keep index in sync when opening new post
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const currentPost = posts[currentIndex];
  if (!currentPost) return null;

  const isOwner = currentPost.creator_id === currentUser;
  const isLiked = likedPosts.includes(currentPost.id);
  const isSaved = savedPosts.includes(currentPost.id);

  const isVideo =
    currentPost.image?.includes('.mp4') ||
    currentPost.image?.includes('.webm') ||
    currentPost.type === 'video';

  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowMenu(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setShowMenu(false);
    }
  };

  /* Keyboard navigation (desktop) */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex]);

  /* Touch swipe (mobile) */
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diff = touchStartY.current - touchEndY.current;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrevious();
  };

  return (
    <div
      className="post-viewer-overlay"
      ref={viewerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button className="viewer-close-btn" onClick={onClose}>✕</button>

      {/* Desktop navigation */}
      {currentIndex > 0 && (
        <button className="viewer-nav-btn prev" onClick={handlePrevious}>‹</button>
      )}
      {currentIndex < posts.length - 1 && (
        <button className="viewer-nav-btn next" onClick={handleNext}>›</button>
      )}

      <div className="viewer-content">
        {/* MEDIA */}
        <div className="viewer-media">
          {isVideo ? (
            <video
              src={currentPost.image}
              className="viewer-video"
              controls
            />
          ) : (
            <img
              src={currentPost.image}
              alt={currentPost.caption}
              className="viewer-image"
            />
          )}
        </div>

        {/* SIDEBAR */}
        <div className="viewer-sidebar">
          {/* TOP */}
          <div className="viewer-top">
            <div className="viewer-header">
              <div className="viewer-author">
                <div className="viewer-avatar">
                  {currentPost.author.charAt(0).toUpperCase()}
                </div>
                <div className="viewer-author-info">
                  <span className="viewer-author-name">
                    {currentPost.author}
                  </span>
                  <span className="viewer-post-time">5h ago</span>
                </div>
              </div>

              {isOwner && (
                <div className="viewer-menu">
                  <button
                    className="viewer-menu-btn"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    ⋮
                  </button>
                  {showMenu && (
                    <div className="viewer-dropdown">
                      <button onClick={() => { onEdit(currentPost); onClose(); }}>
                        ✏️ Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => { onDelete(currentPost.id); onClose(); }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="viewer-caption">
              {currentPost.caption}
            </div>
          </div>

          {/* BOTTOM (desktop) */}
          <div className="viewer-bottom">
            <div className="viewer-actions">
              <button onClick={() => onLike(currentPost.id)}>
                {isLiked ? '❤️' : '🤍'} {Math.max(0, currentPost.likes)}
              </button>
              <button onClick={() => onSave(currentPost.id)}>
                {isSaved ? '🔖' : '🏷️'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FLOATING ACTIONS */}
      <div className="mobile-actions">
        <button onClick={(e) => { e.stopPropagation(); onLike(currentPost.id); }}>
          {isLiked ? '❤️' : '🤍'}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onSave(currentPost.id); }}>
          {isSaved ? '🔖' : '🏷️'}
        </button>
      </div>
    </div>
  );
}

export default PostViewer;
