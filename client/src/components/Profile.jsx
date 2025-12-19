import { useState } from 'react';
import './Profile.css';

function Profile({ currentUser, onEditClick }) {
  const [activeTab, setActiveTab] = useState('posts');
  const [following, setFollowing] = useState(false);

  // Profile data
  const profileData = {
    username: currentUser || 'user',
    displayName: 'Rhonda Carrier',
    verified: true,
    avatar: currentUser ? currentUser.charAt(0).toUpperCase() : 'R',
    postsCount: '1,623',
    followersCount: '1,651',
    followingCount: '4,734',
    bio: `Travel, fitness, lifestyle, food, lifestyle, education ++
For Nat Geo, Guardian, Telegraph, Metro ++
UK PR Guru || Favola || Turismo
@ethis.co.uk/20370971/4#-youre-not-into-living-why-not-l...`,
    website: 'ethis.co.uk',
    stories: [
      { id: 1, image: '🏔️', title: 'Nature', active: true },
      { id: 2, image: '🏃', title: 'Fitness', active: false },
      { id: 3, image: '👥', title: 'Friends', active: false },
      { id: 4, image: '🎨', title: 'Art', active: false },
      { id: 5, image: '🍕', title: 'Food', active: false },
    ],
    posts: [
      { id: 1, image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400', type: 'image' },
      { id: 2, image: 'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=400', type: 'image' },
      { id: 3, image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=400', type: 'image' },
      { id: 4, image: 'https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=400', type: 'image' },
      { id: 5, image: 'https://images.unsplash.com/photo-1682687220198-88e9bdea9931?w=400', type: 'image' },
      { id: 6, image: 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=400', type: 'image' },
      { id: 7, image: 'https://images.unsplash.com/photo-1682687220566-5599dbbebf11?w=400', type: 'image' },
      { id: 8, image: 'https://images.unsplash.com/photo-1682687220801-eef408f95d71?w=400', type: 'image' },
      { id: 9, image: 'https://images.unsplash.com/photo-1682687221073-1a67fa7b8f02?w=400', type: 'image' },
    ]
  };

  const isOwnProfile = true; // Since we're viewing our own profile

  const handleFollow = () => {
    setFollowing(!following);
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        {/* Profile Header */}
        <div className="profile-header">
          {/* Avatar and Stats */}
          <div className="profile-top">
            <div className="profile-avatar-large">
              {profileData.avatar}
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{profileData.postsCount}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profileData.followersCount}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profileData.followingCount}</span>
                <span className="stat-label">Following</span>
              </div>
            </div>
          </div>

          {/* Name and Bio */}
          <div className="profile-info">
            <div className="profile-name">
              {profileData.displayName}
              {profileData.verified && <span className="verified-badge-profile">✓</span>}
            </div>
            <div className="profile-bio">{profileData.bio}</div>
            <a href={`https://${profileData.website}`} className="profile-link" target="_blank" rel="noopener noreferrer">
              {profileData.website}
            </a>
          </div>

          {/* Action Buttons */}
          <div className="profile-actions">
            {isOwnProfile ? (
              <>
                <button className="profile-btn edit-btn">Edit Profile</button>
                <button className="profile-btn share-btn">Share Profile</button>
                <button className="profile-btn-icon">👤➕</button>
              </>
            ) : (
              <>
                <button 
                  className={`profile-btn ${following ? 'following-btn' : 'follow-btn'}`}
                  onClick={handleFollow}
                >
                  {following ? 'Following' : 'Follow'}
                </button>
                <button className="profile-btn message-btn">Message</button>
                <button className="profile-btn-icon">👤➕</button>
                <button className="profile-btn-icon">⋯</button>
              </>
            )}
          </div>

          {/* Story Highlights */}
          <div className="story-highlights">
            {profileData.stories.map((story) => (
              <div key={story.id} className="highlight-item">
                <div className={`highlight-circle ${story.active ? 'active' : ''}`}>
                  <span className="highlight-emoji">{story.image}</span>
                </div>
                <span className="highlight-title">{story.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <span className="tab-icon">⊞</span>
            <span className="tab-label">POSTS</span>
          </button>
          <button 
            className={`profile-tab ${activeTab === 'reels' ? 'active' : ''}`}
            onClick={() => setActiveTab('reels')}
          >
            <span className="tab-icon">🎬</span>
            <span className="tab-label">REELS</span>
          </button>
          <button 
            className={`profile-tab ${activeTab === 'tagged' ? 'active' : ''}`}
            onClick={() => setActiveTab('tagged')}
          >
            <span className="tab-icon">👤</span>
            <span className="tab-label">TAGGED</span>
          </button>
        </div>

        {/* Posts Grid */}
        {activeTab === 'posts' && (
          <div className="profile-posts-grid">
            {profileData.posts.map((post) => (
              <div key={post.id} className="profile-post-item">
                <img src={post.image} alt="Post" />
                <div className="post-overlay">
                  <div className="post-stats">
                    <span>❤️ {Math.floor(Math.random() * 1000)}</span>
                    <span>💬 {Math.floor(Math.random() * 100)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reels' && (
          <div className="empty-tab">
            <div className="empty-icon">🎬</div>
            <p>No Reels Yet</p>
          </div>
        )}

        {activeTab === 'tagged' && (
          <div className="empty-tab">
            <div className="empty-icon">👤</div>
            <p>No Photos Tagged</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
