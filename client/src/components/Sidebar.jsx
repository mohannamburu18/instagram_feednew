import { useState } from 'react';
import './Sidebar.css';

function Sidebar({ currentView, onNavigate, currentUser }) {
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const menuItems = [
    { id: 'home', icon: '🏠', label: 'Home', view: 'feed' },
    { id: 'search', icon: '🔍', label: 'Search', view: 'search' },
    { id: 'explore', icon: '🧭', label: 'Explore', view: 'feed' },
    { id: 'reels', icon: '🎬', label: 'Reels', view: 'reels' },
    { id: 'messages', icon: '💬', label: 'Messages', view: 'messages' },
    { id: 'notifications', icon: '🔔', label: 'Notifications', view: 'notifications', badge: 0 },
    { id: 'create', icon: '➕', label: 'Create', action: 'create' },
    { id: 'profile', icon: '👤', label: 'Profile', view: 'profile' },
  ];

  const handleItemClick = (item) => {
    if (item.action === 'create') {
      onNavigate('create');
    } else if (item.view) {
      onNavigate(item.view);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">InstagramFeed</h1>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${currentView === item.view ? 'active' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="sidebar-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-item">
          <span className="sidebar-icon">☰</span>
          <span className="sidebar-label">More</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
