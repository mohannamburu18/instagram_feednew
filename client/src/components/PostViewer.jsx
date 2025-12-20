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

  // Desktop keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex]);

  // Mobile swipe
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
            <img src={currentPost.image} alt={currentPost.caption} className="viewer-image" />
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
                <div className="viewer-menu">
                  <button className="viewer-menu-btn" onClick={() => setShowMenu(!showMenu)}>⋮</button>
                  {showMenu && (
                    <div className="viewer-dropdown">
                      <button onClick={() => { onEdit(currentPost); onClose(); }}>✏️ Edit</button>
                      <button className="delete" onClick={() => { onDelete(currentPost.id); onClose(); }}>🗑️ Delete</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="viewer-caption">{currentPost.caption}</div>
          </div>
