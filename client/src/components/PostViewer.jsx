import { useState } from 'react';
import './PostViewer.css';

function PostViewer({
  posts,
  initialIndex,
  onClose,
  onLike,
  onSave,
  likedPosts,
  savedPosts
}) {
  const [index, setIndex] = useState(initialIndex);
  const post = posts[index];

  if (!post) return null;

  return (
    <div className="post-viewer-overlay">

      {/* CLOSE */}
      <button className="viewer-close-btn" onClick={onClose}>✕</button>

      {/* PREV */}
      {index > 0 && (
        <button
          className="viewer-nav-btn prev"
          onClick={() => setIndex(i => i - 1)}
        >
          ‹
        </button>
      )}

      {/* NEXT */}
      {index < posts.length - 1 && (
        <button
          className="viewer-nav-btn next"
          onClick={() => setIndex(i => i + 1)}
        >
          ›
        </button>
      )}

      {/* CONTENT */}
      <div className="viewer-content">
        <div className="viewer-media">
          <img src={post.image} alt="" className="viewer-image" />
        </div>

        <div className="viewer-sidebar">
          <div className="viewer-top">
            <div className="viewer-author">
              <div className="viewer-avatar">
                {post.author?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="viewer-author-name">{post.author}</div>
                <div className="viewer-post-time">Just now</div>
              </div>
            </div>

            <p className="viewer-caption">{post.caption}</p>
          </div>

          <div className="viewer-bottom">
            <div className="viewer-actions">
              <button onClick={() => onLike(post.id)}>
                {likedPosts.includes(post.id) ? '❤️' : '🤍'} {post.likes}
              </button>
              <button onClick={() => onSave(post.id)}>
                {savedPosts.includes(post.id) ? '🔖' : '📑'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostViewer;
