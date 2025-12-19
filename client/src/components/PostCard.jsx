import { useState, useRef, useEffect } from 'react';
import './PostCard.css';

function PostCard({ post, isLiked, isSaved, onLike, onSave, onEdit, onDelete, gridIndex, currentUser, onView }) {
  const [imageError, setImageError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  // Check if current user owns this post
  const isOwner = post.creator_id === currentUser;

  // Determine if this is a video post
  const isVideo = post.image && (
    post.image.includes('.mp4') || 
    post.image.includes('.webm') || 
    post.image.includes('video') ||
    post.type === 'video'
  );

  // Create dynamic grid sizes for visual interest
  const getGridSize = (index) => {
    const patterns = [
      'small', 'large', 'medium', 'small',
      'medium', 'small', 'large', 'small',
      'small', 'medium', 'small', 'large'
    ];
    return patterns[index % patterns.length];
  };

  const handleVideoToggle = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCardClick = () => {
    onView(gridIndex);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && videoRef.current && isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isPlaying]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const truncateCaption = (text, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className={`explore-card ${getGridSize(gridIndex)}`}
      ref={cardRef}
      onClick={handleCardClick}
    >
      {/* Media Container */}
      <div className="card-media">
        {!imageError ? (
          isVideo ? (
            <>
              <video
                ref={videoRef}
                src={post.image}
                className="card-video"
                loop
                muted
                playsInline
                onError={() => setImageError(true)}
              />
              <div className="video-overlay">
                <button 
                  className="video-play-btn"
                  onClick={handleVideoToggle}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <div className="video-indicator">
                  <span className="video-icon">🎬</span>
                </div>
              </div>
            </>
          ) : (
            <img
              src={post.image}
              alt={post.caption}
              className="card-image"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )
        ) : (
          <div className="media-error">
            <span className="error-icon">🖼️</span>
            <p>Media unavailable</p>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="card-overlay">
          <div className="overlay-gradient"></div>
          
          {/* Top Actions */}
          <div className="card-top-actions">
            <button
              className={`quick-action-btn like-btn ${isLiked ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onLike(post.id);
              }}
            >
              {isLiked ? '❤️' : '🤍'}
            </button>
            {isOwner && (
              <>
                <button
                  className="quick-action-btn menu-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                >
                  ⋮
                </button>
                {showMenu && (
                  <div className="quick-menu">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(post); }}>
                      ✏️ Edit
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(post.id); }} className="delete">
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bottom Info */}
          <div className="card-info">
            <div className="card-author">
              <div className="author-avatar-small">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <span className="author-name-small">{post.author}</span>
              <span className="post-time-small">• {formatDate(post.created_at)}</span>
            </div>
            <div className="card-caption">
              {truncateCaption(post.caption)}
            </div>
            <div className="card-stats">
              <span className="stat-item">
                <span className="stat-icon">❤️</span>
                {post.likes > 1000 ? `${(post.likes / 1000).toFixed(1)}K` : post.likes}
              </span>
              <span className="stat-item">
                <span className="stat-icon">💬</span>
                {Math.floor(Math.random() * 50)}
              </span>
              <button
                className={`save-btn-corner ${isSaved ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSave(post.id);
                }}
              >
                {isSaved ? '🔖' : '🏷️'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
