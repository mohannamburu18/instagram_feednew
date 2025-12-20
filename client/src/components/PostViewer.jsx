import { useState, useEffect, useRef } from 'react';
import './PostViewer.css';

function PostViewer({ posts, initialIndex, onClose, currentUser, onLike, onSave, onEdit, onDelete, likedPosts, savedPosts }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const videoRef = useRef(null);
  const viewerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const currentPost = posts[currentIndex];
  const isOwner = currentPost?.creator_id === currentUser;
  const isLiked = likedPosts.includes(currentPost?.id);
  const isSaved = savedPosts.includes(currentPost?.id);

  // Check if it's a video
  const isVideo = currentPost?.image && (
    currentPost.image.includes('.mp4') || 
    currentPost.image.includes('.webm') || 
    currentPost.image.includes('video') ||
    currentPost.type === 'video'
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, posts.length]);

  // Handle wheel scroll
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        handleNext();
      } else if (e.deltaY < 0) {
        handlePrevious();
      }
    };

    const viewer = viewerRef.current;
    if (viewer) {
      viewer.addEventListener('wheel', handleWheel, { passive: false });
      return () => viewer.removeEventListener('wheel', handleWheel);
    }
  }, [currentIndex, posts.length]);

  // Handle touch swipe
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    const threshold = 50;

    if (swipeDistance > threshold) {
      handleNext();
    } else if (swipeDistance < -threshold) {
      handlePrevious();
    }
  };

  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(false);
      setShowMenu(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(false);
      setShowMenu(false);
    }
  };

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onLike(currentPost.id);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave(currentPost.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  if (!currentPost) return null;

  return (
    <div 
      className="post-viewer-overlay"
      ref={viewerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button className="viewer-close-btn" onClick={onClose}>
        ✕
      </button>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button className="viewer-nav-btn prev" onClick={handlePrevious}>
          ‹
        </button>
      )}
      {currentIndex < posts.length - 1 && (
        <button className="viewer-nav-btn next" onClick={handleNext}>
          ›
        </button>
      )}

      {/* Progress Indicator */}
      <div className="viewer-progress">
        <div className="progress-bar">
          {posts.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'completed' : ''}`}
            />
          ))}
        </div>
        <span className="progress-text">
          {currentIndex + 1} / {posts.length}
        </span>
      </div>

      {/* Main Content */}
      <div className="viewer-content">
        {/* Media Section */}
        <div className="viewer-media">
          {isVideo ? (
            <div className="viewer-video-container">
              <video
                ref={videoRef}
                src={currentPost.image}
                className="viewer-video"
                loop
                playsInline
              />
              <button className="viewer-play-btn" onClick={handleVideoToggle}>
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>
          ) : (
            <img
              src={currentPost.image}
              alt={currentPost.caption}
              className="viewer-image"
            />
          )}
        </div>

        {/* Info Sidebar */}
        <div className="viewer-sidebar">
          {/* Post Header */}
          <div className="viewer-header">
            <div className="viewer-author">
              <div className="viewer-avatar">
                {currentPost.author.charAt(0).toUpperCase()}
              </div>
              <div className="viewer-author-info">
                <span className="viewer-author-name">{currentPost.author}</span>
                <span className="viewer-post-time">{formatDate(currentPost.created_at)}</span>
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
                      ✏️ Edit Post
                    </button>
                    <button 
                      onClick={() => { onDelete(currentPost.id); onClose(); }}
                      className="delete"
                    >
                      🗑️ Delete Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="viewer-caption-section">
            <div className="viewer-caption">
              <span className="caption-author">{currentPost.author}</span>
              <span className="caption-text">{currentPost.caption}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="viewer-actions">
            <div className="viewer-actions-left">
              <button
                className={`viewer-action-btn ${isLiked ? 'liked' : ''}`}
                onClick={handleLike}
              >
                {isLiked ? '❤️' : '🤍'}
                <span className="action-label">
                  {currentPost.likes > 1000 
                    ? `${(currentPost.likes / 1000).toFixed(1)}K` 
                    : currentPost.likes}
                </span>
              </button>
              <button className="viewer-action-btn">
                💬
                <span className="action-label">{Math.floor(Math.random() * 100)}</span>
              </button>
              <button className="viewer-action-btn">
                📤
              </button>
            </div>
            <button
              className={`viewer-action-btn save ${isSaved ? 'saved' : ''}`}
              onClick={handleSave}
            >
              {isSaved ? '🔖' : '🏷️'}
            </button>
          </div>

          {/* Scroll Hint */}
          <div className="viewer-hint">
            <span>↓ Scroll to see next post ↓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostViewer;
