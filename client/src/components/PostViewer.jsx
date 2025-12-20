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
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const videoRef = useRef(null);
  const viewerRef = useRef(null);

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
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex]);

  return (
    <div className="post-viewer-overlay" ref={viewerRef}>
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
            <video
              ref={videoRef}
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

        <div className="viewer-sidebar">
          <div className="viewer-header">
            <strong>{currentPost.author}</strong>
            {isOwner && (
              <button onClick={() => setShowMenu(!showMenu)}>⋮</button>
            )}
            {showMenu && (
              <div className="viewer-dropdown">
                <button onClick={() => { onEdit(currentPost); onClose(); }}>
                  ✏️ Edit
                </button>
                <button onClick={() => { onDelete(currentPost.id); onClose(); }}>
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>

          <p>{currentPost.caption}</p>

          <div className="viewer-actions">
            <button onClick={() => onLike(currentPost.id)}>
              {isLiked ? '❤️' : '🤍'} {currentPost.likes}
            </button>
            <button onClick={() => onSave(currentPost.id)}>
              {isSaved ? '🔖' : '🏷️'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostViewer;
