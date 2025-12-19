import { useState } from 'react';
import './RightSidebar.css';

function RightSidebar({ currentUser }) {
  const [followRequests, setFollowRequests] = useState({});
  
  // Sample suggested users
  const suggestedUsers = [
    { id: 1, username: 'travel_explorer', name: 'Travel Explorer', avatar: 'T', verified: true },
    { id: 2, username: 'foodie_dreams', name: 'Foodie Dreams', avatar: 'F', verified: false },
    { id: 3, username: 'fitness_journey', name: 'Fitness Journey', avatar: 'F', verified: true },
    { id: 4, username: 'urban_photographer', name: 'Urban Photographer', avatar: 'U', verified: false },
    { id: 5, username: 'coffee_lover', name: 'Coffee Lover', avatar: 'C', verified: false },
    { id: 6, username: 'adventure_seeker', name: 'Adventure Seeker', avatar: 'A', verified: true },
    { id: 7, username: 'bookworm_reads', name: 'Bookworm Reads', avatar: 'B', verified: false },
    { id: 8, username: 'pet_paradise', name: 'Pet Paradise', avatar: 'P', verified: false },
  ];

  const handleFollow = (userId) => {
    setFollowRequests(prev => ({
      ...prev,
      [userId]: true
    }));

    // Simulate API call
    setTimeout(() => {
      console.log(`Follow request sent to user ${userId}`);
    }, 500);
  };

  const handleUnfollow = (userId) => {
    setFollowRequests(prev => {
      const newState = { ...prev };
      delete newState[userId];
      return newState;
    });
  };

  return (
    <div className="right-sidebar">
      <div className="right-sidebar-content">
        {/* Current User Profile */}
        <div className="current-user-profile">
          <div className="current-user-avatar">
            {currentUser ? currentUser.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="current-user-info">
            <span className="current-user-name">{currentUser || 'Guest'}</span>
            <span className="current-user-subtitle">Welcome back!</span>
          </div>
          <button className="switch-btn">Switch</button>
        </div>

        {/* Suggested For You */}
        <div className="suggested-section">
          <div className="suggested-header">
            <h3>Suggested for you</h3>
            <button className="see-all-btn">See All</button>
          </div>

          <div className="suggested-list">
            {suggestedUsers.map((user) => (
              <div key={user.id} className="suggested-user">
                <div className="suggested-user-left">
                  <div className="suggested-avatar">
                    {user.avatar}
                  </div>
                  <div className="suggested-user-info">
                    <div className="suggested-username">
                      {user.username}
                      {user.verified && <span className="verified-badge">✓</span>}
                    </div>
                    <span className="suggested-subtitle">Suggested for you</span>
                  </div>
                </div>
                {followRequests[user.id] ? (
                  <button 
                    className="unfollow-btn"
                    onClick={() => handleUnfollow(user.id)}
                  >
                    Following
                  </button>
                ) : (
                  <button 
                    className="follow-btn"
                    onClick={() => handleFollow(user.id)}
                  >
                    Follow
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="right-sidebar-footer">
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#help">Help</a>
            <a href="#press">Press</a>
            <a href="#api">API</a>
            <a href="#jobs">Jobs</a>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#locations">Locations</a>
            <a href="#language">Language</a>
          </div>
          <div className="footer-copyright">
            © 2025 INSTAGRAM FEED
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
