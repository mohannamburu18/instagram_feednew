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
  const [showSaveToast, setShowSaveToast] = useState(false);

  const viewerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

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
      setCurrentIndex(i => i + 1);
      setShowMenu(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setShowMenu(false);
    }
  };

  /* Keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex]);

  /* Touch swipe */
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

  const handleSaveClick = () => {
    onSave(currentPost.id);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 1200);
  };

  return (
    <div
      className="post-viewer-overlay"
      ref={viewerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button className="viewer-close-btn" onClick={onClose}>✕</button>

      {currentIndex > 0 && (
        <button className="viewer-nav-btn prev" onClick={handlePrevious}>‹</button>
      )}
      {currentIndex < posts.length - 1 && (
        <button className="viewer-nav-btn next" onClick={handleNext}>›</button>
      )}

      <div className="viewer-content">
        <div className="viewer-media">
          {isVideo ? (
            <video src={currentPost.image} className="viewer-video" controls />
          ) : (
            <img src={currentPost.image} alt="" className="viewer-image" />
          )}
        </div>

        <div className="viewer-sidebar">
          <div className="viewer-top">
            <div className="viewer-header">
              <div className="viewer-author">
                <div className="viewer-avatar">
                  {currentPost.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="viewer-author-name">{currentPost.author}</div>
                  <div className="viewer-post-time">5h ago</div>
                </div>
              </div>

              {isOwner && (
                <button className="viewer-menu-btn" onClick={() => setShowMenu(!showMenu)}>
                  ⋮
                </button>
              )}
            </div>

            <div className="viewer-caption">{currentPost.caption}</div>
          </div>

          <div className="viewer-bottom">
            <div className="viewer-actions">
              <button onClick={() => onLike(currentPost.id)}>
                {isLiked ? '❤️' : '🤍'} {Math.max(0, currentPost.likes)}
              </button>

              <button
                className={`save-btn ${isSaved ? 'saved' : ''}`}
                onClick={handleSaveClick}
              >
                {isSaved ? '🔖' : '🏷️'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile floating buttons */}
      <div className="mobile-actions">
        <button onClick={() => onLike(currentPost.id)}>
          {isLiked ? '❤️' : '🤍'}
        </button>
        <button
          className={isSaved ? 'saved' : ''}
          onClick={handleSaveClick}
        >
          {isSaved ? '🔖' : '🏷️'}
        </button>
      </div>

      {showSaveToast && (
        <div className="save-toast">
          {isSaved ? 'Saved to Saved' : 'Removed from Saved'}
        </div>
      )}
    </div>
  );
}

export default PostViewer;
