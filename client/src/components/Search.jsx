import { useState } from 'react';
import './Search.css';

function Search() {
  const [activeTab, setActiveTab] = useState('top');
  const [searchQuery, setSearchQuery] = useState('');

  // Recent searches
  const recentSearches = [
    { id: 1, username: 'mumfordandsons', name: 'Mumford & Sons', avatar: 'M', following: true, verified: true },
    { id: 2, username: 'haileybieber', name: 'Hailey Baldwin Bieber', avatar: 'H', following: true, verified: true },
    { id: 3, username: 'gigihadid', name: 'Gigi Hadid', avatar: 'G', following: true, verified: true },
    { id: 4, username: 'robinnyc', name: 'Robin Arzon', avatar: 'R', following: false, newPosts: 3 },
    { id: 5, username: 'rejectedjokes', name: 'Ben Schwartz', avatar: 'B', following: false, newPosts: 1 },
  ];

  const tabs = ['Top', 'Accounts', 'Tags', 'Places'];

  return (
    <div className="search-container">
      <div className="search-sidebar">
        {/* Header */}
        <div className="search-header">
          <h2>Search</h2>
        </div>

        {/* Search Input */}
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="search-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`search-tab ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Recent Section */}
        <div className="recent-section">
          <div className="recent-header">
            <span className="recent-title">Recent</span>
            <button className="see-all-link">See All</button>
          </div>

          {/* Recent Searches List */}
          <div className="recent-list">
            {recentSearches.map((item) => (
              <div key={item.id} className="recent-item">
                <div className="recent-item-left">
                  <div className="recent-avatar">{item.avatar}</div>
                  <div className="recent-info">
                    <div className="recent-username">
                      {item.username}
                      {item.verified && <span className="verified-badge-search">✓</span>}
                    </div>
                    <div className="recent-subtitle">
                      {item.following ? (
                        <span className="following-label">{item.name} • Following</span>
                      ) : (
                        <span className="new-posts-label">{item.name} • {item.newPosts} new post{item.newPosts > 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>
                </div>
                <button className="remove-search-btn">✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Search Results */}
      <div className="search-results-panel">
        {searchQuery ? (
          <div className="search-results">
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>Search for "{searchQuery}"</h3>
              <p>Try searching for people, tags, or places</p>
            </div>
          </div>
        ) : (
          <div className="search-empty">
            <div className="search-empty-icon">🔍</div>
            <h3>Search</h3>
            <p>Search for users, hashtags, and places</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
