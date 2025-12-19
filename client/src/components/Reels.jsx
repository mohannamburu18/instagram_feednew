import { useState, useRef, useEffect } from 'react';
import './Reels.css';

function Reels() {
  const [currentReel, setCurrentReel] = useState(0);
  const [likedReels, setLikedReels] = useState([]);
  const containerRef = useRef(null);

  // Sample reels data (using video URLs or placeholders)
  const reels = [
    {
      id: 1,
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      author: 'travel_explorer',
      avatar: 'T',
      caption: 'Amazing sunset views 🌅 #travel #nature',
      likes: '12.5K',
      comments: '234',
      verified: true
    },
    {
      id: 2,
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      author: 'foodie_dreams',
      avatar: 'F',
      caption: 'Best pasta recipe! 🍝 Try this at home #cooking #food',
      likes: '8.2K',
      comments: '156',
      verified: false
    },
    {
      id: 3,
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      author: 'fitness_journey',
      avatar: 'F',
      caption: 'Morning workout routine 💪 #fitness #motivation',
      likes: '15.3K',
      comments: '389',
      verified: true
    },
    {
      id: 4,
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      author: 'adventure_seeker',
      avatar: 'A',
      caption: 'Epic mountain climbing! 🏔️ #adventure #climbing',
      likes: '20.1K',
      comments: '512',
      verified: true
    },
  ];

  // Handle scroll with debounce
  useEffect(() => {
    let scrollTimeout;
    const container = containerRef.current;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollTop = container.scrollTop;
        const reelHeight = window.innerHeight;
        const newIndex = Math.round(scrollTop / reelHeight);
        
        if (newIndex !== currentReel && newIndex < reels.length) {
          setCurrentReel(newIndex);
        }
      }, 100);
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    }
  }, [currentReel, reels.length]);

  const handleLike = (reelId) => {
    setLikedReels(prev => 
      prev.includes(reelId) 
        ? prev.filter(id => id !== reelId)
        : [...prev, reelId]
    );
  };

  return (
    <div className="reels-container" ref={containerRef}>
      {reels.map((reel, index) => (
        <div key={reel.id} className="reel-item">
          {/* Video */}
          <video
            className="reel-video"
            src={reel.video}
            loop
            muted
            autoPlay={index === currentReel}
            playsInline
          />

          {/* Gradient Overlay */}
          <div className="reel-overlay"></div>

          {/* Top Header */}
          <div className="reel-header">
            <span className="reels-title">Reels</span>
            <button className="reel-camera-btn">📷</button>
          </div>

          {/* Bottom Info */}
          <div className="reel-info">
            {/* Left Side - Author & Caption */}
            <div className="reel-left">
              <div className="reel-author-section">
                <div className="reel-author-avatar">{reel.avatar}</div>
                <span className="reel-author-name">
                  {reel.author}
                  {reel.verified && <span className="verified-check">✓</span>}
                </span>
                <button className="follow-reel-btn">Follow</button>
              </div>
              <div className="reel-caption">
                {reel.caption}
              </div>
              <div className="reel-audio">
                🎵 Original Audio - {reel.author}
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="reel-actions">
              <button 
                className={`reel-action-btn ${likedReels.includes(reel.id) ? 'liked' : ''}`}
                onClick={() => handleLike(reel.id)}
              >
                {likedReels.includes(reel.id) ? '❤️' : '🤍'}
                <span>{reel.likes}</span>
              </button>

              <button className="reel-action-btn">
                💬
                <span>{reel.comments}</span>
              </button>

              <button className="reel-action-btn">
                📤
              </button>

              <button className="reel-action-btn">
                ⋯
              </button>

              <div className="reel-author-thumb">
                {reel.avatar}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Scroll Indicator */}
      <div className="reels-progress">
        {reels.map((_, index) => (
          <div
            key={index}
            className={`progress-line ${index === currentReel ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Reels;
